/**
 * FlowPay Delegation Event Handlers for Envio HyperIndex
 *
 * These handlers process ERC-7715 permission events and store them
 * in a queryable database for the FlowPay dashboard.
 */

import {
  DelegationManager,
  Permission,
  Analytics,
  User,
  DailyStats,
} from "generated";

// Helper to get or create global analytics
async function getOrCreateAnalytics(context: any): Promise<Analytics> {
  let analytics = await context.Analytics.get("global");
  if (!analytics) {
    analytics = {
      id: "global",
      totalPermissions: 0,
      activePermissions: 0,
      totalPayments: 0,
      totalVolume: "0",
      uniqueUsers: 0,
      lastUpdated: 0,
    };
  }
  return analytics;
}

// Helper to get or create user stats
async function getOrCreateUser(context: any, address: string): Promise<User> {
  let user = await context.User.get(address);
  if (!user) {
    user = {
      id: address,
      totalPermissionsGranted: 0,
      activePermissions: 0,
      totalPaymentsSent: 0,
      totalPaymentsReceived: 0,
      totalVolumeSent: "0",
      totalVolumeReceived: "0",
      firstActivityAt: 0,
      lastActivityAt: 0,
    };
  }
  return user;
}

// Helper to get date string from timestamp
function getDateString(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toISOString().split("T")[0];
}

// Handle PermissionGranted events
DelegationManager.PermissionGranted.handler(async ({ event, context }) => {
  const { granter, sessionAccount, context: permContext, expiry } = event.args;
  const timestamp = event.block.timestamp;

  // Create permission record
  const permission: Permission = {
    id: permContext,
    grantedAt: Number(timestamp),
    granter: granter.toLowerCase(),
    sessionAccount: sessionAccount.toLowerCase(),
    tokenAddress: "", // Will be filled by application
    permissionType: "periodic", // Default, updated by application
    periodAmount: null,
    periodDuration: null,
    amountPerSecond: null,
    maxAmount: null,
    expiry: Number(expiry),
    context: permContext,
    status: "active",
    createdAtBlock: event.block.number,
    createdAtTx: event.transaction.hash,
  };

  await context.Permission.set(permission);

  // Update analytics
  const analytics = await getOrCreateAnalytics(context);
  analytics.totalPermissions += 1;
  analytics.activePermissions += 1;
  analytics.lastUpdated = Number(timestamp);
  await context.Analytics.set(analytics);

  // Update user stats
  const user = await getOrCreateUser(context, granter.toLowerCase());
  user.totalPermissionsGranted += 1;
  user.activePermissions += 1;
  if (user.firstActivityAt === 0) {
    user.firstActivityAt = Number(timestamp);
  }
  user.lastActivityAt = Number(timestamp);
  await context.User.set(user);

  // Update daily stats
  const dateStr = getDateString(Number(timestamp));
  let dailyStats = await context.DailyStats.get(dateStr);
  if (!dailyStats) {
    dailyStats = {
      id: dateStr,
      date: Number(timestamp),
      permissionsGranted: 0,
      permissionsRevoked: 0,
      paymentsExecuted: 0,
      volume: "0",
      uniqueUsers: 0,
    };
  }
  dailyStats.permissionsGranted += 1;
  await context.DailyStats.set(dailyStats);
});

// Handle PermissionRevoked events
DelegationManager.PermissionRevoked.handler(async ({ event, context }) => {
  const { granter, context: permContext } = event.args;
  const timestamp = event.block.timestamp;

  // Update permission status
  const permission = await context.Permission.get(permContext);
  if (permission) {
    permission.status = "revoked";
    await context.Permission.set(permission);
  }

  // Update analytics
  const analytics = await getOrCreateAnalytics(context);
  analytics.activePermissions = Math.max(0, analytics.activePermissions - 1);
  analytics.lastUpdated = Number(timestamp);
  await context.Analytics.set(analytics);

  // Update user stats
  const user = await getOrCreateUser(context, granter.toLowerCase());
  user.activePermissions = Math.max(0, user.activePermissions - 1);
  user.lastActivityAt = Number(timestamp);
  await context.User.set(user);

  // Update daily stats
  const dateStr = getDateString(Number(timestamp));
  let dailyStats = await context.DailyStats.get(dateStr);
  if (!dailyStats) {
    dailyStats = {
      id: dateStr,
      date: Number(timestamp),
      permissionsGranted: 0,
      permissionsRevoked: 0,
      paymentsExecuted: 0,
      volume: "0",
      uniqueUsers: 0,
    };
  }
  dailyStats.permissionsRevoked += 1;
  await context.DailyStats.set(dailyStats);
});

// Handle DelegationExecuted events (payment executions)
DelegationManager.DelegationExecuted.handler(async ({ event, context }) => {
  const { context: permContext, executor, to, value } = event.args;
  const timestamp = event.block.timestamp;

  // Create payment record
  const paymentId = `${event.transaction.hash}-${event.logIndex}`;
  const payment = {
    id: paymentId,
    permission_id: permContext,
    executedAt: Number(timestamp),
    from: executor.toLowerCase(),
    to: to.toLowerCase(),
    amount: value.toString(),
    tokenAddress: "", // Will be determined from transaction data
    transactionHash: event.transaction.hash,
    blockNumber: event.block.number,
  };

  await context.Payment.set(payment);

  // Update analytics
  const analytics = await getOrCreateAnalytics(context);
  analytics.totalPayments += 1;
  analytics.totalVolume = (
    BigInt(analytics.totalVolume) + BigInt(value)
  ).toString();
  analytics.lastUpdated = Number(timestamp);
  await context.Analytics.set(analytics);

  // Update sender stats
  const sender = await getOrCreateUser(context, executor.toLowerCase());
  sender.totalPaymentsSent += 1;
  sender.totalVolumeSent = (
    BigInt(sender.totalVolumeSent) + BigInt(value)
  ).toString();
  sender.lastActivityAt = Number(timestamp);
  await context.User.set(sender);

  // Update receiver stats
  const receiver = await getOrCreateUser(context, to.toLowerCase());
  receiver.totalPaymentsReceived += 1;
  receiver.totalVolumeReceived = (
    BigInt(receiver.totalVolumeReceived) + BigInt(value)
  ).toString();
  if (receiver.firstActivityAt === 0) {
    receiver.firstActivityAt = Number(timestamp);
  }
  receiver.lastActivityAt = Number(timestamp);
  await context.User.set(receiver);

  // Update daily stats
  const dateStr = getDateString(Number(timestamp));
  let dailyStats = await context.DailyStats.get(dateStr);
  if (!dailyStats) {
    dailyStats = {
      id: dateStr,
      date: Number(timestamp),
      permissionsGranted: 0,
      permissionsRevoked: 0,
      paymentsExecuted: 0,
      volume: "0",
      uniqueUsers: 0,
    };
  }
  dailyStats.paymentsExecuted += 1;
  dailyStats.volume = (
    BigInt(dailyStats.volume) + BigInt(value)
  ).toString();
  await context.DailyStats.set(dailyStats);
});
