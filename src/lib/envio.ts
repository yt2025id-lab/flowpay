/**
 * Envio HyperIndex Integration for FlowPay
 *
 * This module provides integration with Envio's HyperIndex for:
 * - Tracking ERC-7715 permission grants
 * - Indexing payment executions
 * - Building analytics dashboards
 *
 * Envio provides up to 2000x faster indexing than traditional RPCs
 *
 * @see https://docs.envio.dev/docs/HyperIndex/overview
 */

import { Address, Hex } from 'viem';

// Envio GraphQL endpoint (to be configured with your deployed indexer)
const ENVIO_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_ENVIO_GRAPHQL_URL || '';

// Types for indexed data
export interface IndexedPermission {
  id: string;
  grantedAt: number;
  granter: Address;
  sessionAccount: Address;
  tokenAddress: Address;
  permissionType: 'periodic' | 'stream';
  periodAmount?: string;
  periodDuration?: number;
  amountPerSecond?: string;
  maxAmount?: string;
  expiry: number;
  context: Hex;
  status: 'active' | 'revoked' | 'expired';
}

export interface IndexedPayment {
  id: string;
  permissionId: string;
  executedAt: number;
  from: Address;
  to: Address;
  amount: string;
  tokenAddress: Address;
  transactionHash: Hex;
}

export interface AnalyticsData {
  totalPermissions: number;
  activePermissions: number;
  totalPayments: number;
  totalVolume: string;
  uniqueUsers: number;
}

/**
 * Fetch permissions for a specific user
 */
export async function fetchUserPermissions(userAddress: Address): Promise<IndexedPermission[]> {
  if (!ENVIO_GRAPHQL_ENDPOINT) {
    console.warn('Envio GraphQL endpoint not configured');
    return [];
  }

  const query = `
    query GetUserPermissions($user: String!) {
      permissions(where: { granter: $user }) {
        id
        grantedAt
        granter
        sessionAccount
        tokenAddress
        permissionType
        periodAmount
        periodDuration
        amountPerSecond
        maxAmount
        expiry
        context
        status
      }
    }
  `;

  try {
    const response = await fetch(ENVIO_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { user: userAddress.toLowerCase() },
      }),
    });

    const { data } = await response.json();
    return data?.permissions || [];
  } catch (error) {
    console.error('Error fetching permissions from Envio:', error);
    return [];
  }
}

/**
 * Fetch payment history for a permission
 */
export async function fetchPaymentHistory(permissionId: string): Promise<IndexedPayment[]> {
  if (!ENVIO_GRAPHQL_ENDPOINT) {
    console.warn('Envio GraphQL endpoint not configured');
    return [];
  }

  const query = `
    query GetPaymentHistory($permissionId: String!) {
      payments(where: { permissionId: $permissionId }, orderBy: executedAt, orderDirection: desc) {
        id
        permissionId
        executedAt
        from
        to
        amount
        tokenAddress
        transactionHash
      }
    }
  `;

  try {
    const response = await fetch(ENVIO_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { permissionId },
      }),
    });

    const { data } = await response.json();
    return data?.payments || [];
  } catch (error) {
    console.error('Error fetching payments from Envio:', error);
    return [];
  }
}

/**
 * Fetch global analytics
 */
export async function fetchAnalytics(): Promise<AnalyticsData | null> {
  if (!ENVIO_GRAPHQL_ENDPOINT) {
    console.warn('Envio GraphQL endpoint not configured');
    return null;
  }

  const query = `
    query GetAnalytics {
      analytics(id: "global") {
        totalPermissions
        activePermissions
        totalPayments
        totalVolume
        uniqueUsers
      }
    }
  `;

  try {
    const response = await fetch(ENVIO_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const { data } = await response.json();
    return data?.analytics || null;
  } catch (error) {
    console.error('Error fetching analytics from Envio:', error);
    return null;
  }
}

/**
 * Fetch recent payments across all users
 */
export async function fetchRecentPayments(limit: number = 10): Promise<IndexedPayment[]> {
  if (!ENVIO_GRAPHQL_ENDPOINT) {
    console.warn('Envio GraphQL endpoint not configured');
    return [];
  }

  const query = `
    query GetRecentPayments($limit: Int!) {
      payments(first: $limit, orderBy: executedAt, orderDirection: desc) {
        id
        permissionId
        executedAt
        from
        to
        amount
        tokenAddress
        transactionHash
      }
    }
  `;

  try {
    const response = await fetch(ENVIO_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { limit },
      }),
    });

    const { data } = await response.json();
    return data?.payments || [];
  } catch (error) {
    console.error('Error fetching recent payments from Envio:', error);
    return [];
  }
}
