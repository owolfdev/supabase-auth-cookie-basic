declare module "@supabase/storage-js" {
  interface StorageFileApi {
    delete(paths: string[]): Promise<{ data: any; error: Error | null }>;
  }
}
