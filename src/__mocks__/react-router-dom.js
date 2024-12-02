const searchParams = { "pid": "123"};

export const MemoryRouter = ({ children }) => <div>{children}</div>;
export const useNavigate = jest.fn();
export const useParams = jest.fn(() => ({}));
export const useLocation = jest.fn(() => ({ pathname: "/" }));
export const useSearchParams = () => {
    return [
        {
            get: jest.fn(() => ""),
        },
        jest.fn((newParams) => {
          Object.entries(newParams).forEach(([key, value]) => {
            mockSearchParams.set(key, value);
          });
        }),
      ];
};
