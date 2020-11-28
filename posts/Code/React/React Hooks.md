## useDebounce Hook
A hook that debounces the giving value.

```jsx
export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}
// const value = useDebounce(val, 500)
```

## useLocation Hook
URL location hook which fires when URL (location.pathname) changes.

```jsx
export function useLocation(){
    const [ location, setLocation ] = useState(window.location.pathname)
    function locListener(){
        const isSamePage = location==window.location.pathname
        //console.log("isSamePage", isSamePage)

        if(!isSamePage){
            setLocation(window.location.pathname)
        }
    }
    useEffect(() =>{
        locListener()
        window.addEventListener("location", locListener);
        // for removing repeatedly rendering
        return () =>{
            window.removeEventListener("location", locListener);
        }
    },[window.location.pathname])
    //console.log("hook", location)

    return location
}
// const path = useLocation()
```


## useWindowWidth
A hook that listens window resizing.

```jsx
export function useWindowWidth() {
  const [screenSize, setScreenSize] = useState(window.innerWidth)//      S | M | L

  const screenListener = () => {
      const currentSize = window.innerWidth;
      //if size (not width) is changed, then change state
      if (screenSize != currentSize) {
          setScreenSize(currentSize);
      }
  }

  useEffect(() => {
      // Once screenSize changed this will be fired
      window.addEventListener("resize", screenListener);
      // for removing repeatedly rendering
      return () => {
          window.removeEventListener("resize", screenListener);
      }
  })
  return screenSize
}
// const vw = useWindowWidth()
```

#react-hooks
