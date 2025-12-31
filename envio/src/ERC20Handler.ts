/**
 * ERC20 Transfer Event Handler for FlowPay
 *
 * Tracks USDC transfers that are part of FlowPay payment flows.
 * This helps build accurate payment history and analytics.
 */

import { USDC, Payment, Analytics, User, DailyStats } from "generated";

// USDC contract address on Sepolia
const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238".toLowerCase();

// Helper to get date string from timestamp
function getDateString(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toISOString().split("T")[0];
}

// Handle ERC20 Transfer events
USDC.Transfer.handler(async ({ event, context }) => {
  const { from, to, value } = event.args;
  const timestamp = event.block.timestamp;

  // Skip mint/burn operations
  if (
    from === "0x0000000000000000000000000000000000000000" ||
    to === "0x0000000000000000000000000000000000000000"
  ) {
    return;
  }

  // Create a transfer record
  // Note: In production, we would cross-reference with permission context
  // to link transfers to specific FlowPay subscriptions
  const transferId = `${event.transaction.hash}-${event.logIndex}`;

  // Check if this transfer is related to a FlowPay payment
  // This would require additional logic to match against session accounts
  // For now, we track all USDC transfers for potential matching

  // Log for debugging (remove in production)
  context.log.info(
    `USDC Transfer: ${from} -> ${to}, Amount: ${value.toString()}`
  );

  // Update user volume statistics
  const sender = await context.User.get(from.toLowerCase());
  if (sender) {
    sender.totalVolumeSent = (
      BigInt(sender.totalVolumeSent) + BigInt(value)
    ).toString();
    sender.lastActivityAt = Number(timestamp);
    await context.User.set(sender);
  }

  const receiver = await context.User.get(to.toLowerCase());
  if (receiver) {
    receiver.totalVolumeReceived = (
      BigInt(receiver.totalVolumeReceived) + BigInt(value)
    ).toString();
    receiver.lastActivityAt = Number(timestamp);
    await context.User.set(receiver);
  }
});
