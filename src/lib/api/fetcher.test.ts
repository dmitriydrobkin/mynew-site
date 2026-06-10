import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiFetch } from './fetcher';

describe('apiFetch', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('should successfully parse and return JSON data on success', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockResponse = {
      ok: true,
      text: vi.fn().mockResolvedValue(JSON.stringify(mockData)),
    };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

    const result = await apiFetch('/test-url');
    expect(global.fetch).toHaveBeenCalledWith('/test-url', expect.any(Object));
    expect(result).toEqual(mockData);
  });

  it('should throw an error with status and error text when response is not ok', async () => {
    const mockErrorText = 'Bad Request';
    const mockStatus = 400;
    const mockResponse = {
      ok: false,
      status: mockStatus,
      text: vi.fn().mockResolvedValue(mockErrorText),
    };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

    await expect(apiFetch('/test-url')).rejects.toThrow(`API Error ${mockStatus}: ${mockErrorText}`);
    expect(global.fetch).toHaveBeenCalledWith('/test-url', expect.any(Object));
  });

  it('should return empty object if API returns an empty response', async () => {
    const mockResponse = {
      ok: true,
      text: vi.fn().mockResolvedValue(''),
    };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

    const result = await apiFetch('/test-url');
    expect(global.fetch).toHaveBeenCalledWith('/test-url', expect.any(Object));
    expect(result).toEqual({});
  });

  it('should handle URL search parameters', async () => {
     const mockData = { id: 1 };
     const mockResponse = {
       ok: true,
       text: vi.fn().mockResolvedValue(JSON.stringify(mockData)),
     };
     (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

     await apiFetch('/test-url', { params: { query: 'test', page: '2' } });

     // Should append ?query=test&page=2
     expect(global.fetch).toHaveBeenCalledWith('/test-url?query=test&page=2', expect.any(Object));
  });

  it('should append params to URL if it already has search parameters', async () => {
     const mockData = { id: 1 };
     const mockResponse = {
       ok: true,
       text: vi.fn().mockResolvedValue(JSON.stringify(mockData)),
     };
     (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

     await apiFetch('/test-url?sort=desc', { params: { query: 'test' } });

     // Should append &query=test
     expect(global.fetch).toHaveBeenCalledWith('/test-url?sort=desc&query=test', expect.any(Object));
  });
});
