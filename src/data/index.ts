
// Export all data types and functions for easy importing
export * from './watchlistData';
export * from './holdingsData';
export * from './positionsData';
export * from './fundsData';

// Common types for MongoDB integration
export interface BaseDocument {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDocument extends BaseDocument {
  email: string;
  name?: string;
  isActive: boolean;
}

// API response types for future backend integration
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
