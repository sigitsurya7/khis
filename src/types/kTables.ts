export interface KTableColumn<T> {
  id: string;
  title: string;
  field?: keyof T;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface FetchParams {
  page: number;
  limit: number;
  search: string;
}

export interface FetchResult<T> {
  data: T[];
  total: number;
}

export interface KTableProps<T> {
  ariaLabel: string;
  header: KTableColumn<T>[];
  params?: any;
  fetchData: (params: {
    page: number;
    limit: number;
    search: string;
    [key: string]: any;
  }) => Promise<{ data: T[]; total: number }>;
  isCompact?: boolean;
}

