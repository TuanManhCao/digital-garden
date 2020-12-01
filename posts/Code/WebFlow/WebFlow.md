## Anchor Link  Jump Speed

Use `data-scroll-time` attribute on  `body`.

* data-scroll-time = 0 will scroll immediately to the element with no delay.
* data-scroll-time = 0.75 will scroll a little faster than the default
* data-scroll-time = 1 will scroll just as fast as usual
* data-scroll-time = 1.25 will scroll a little slower than the default
* data-scroll-time = 2 will scroll twice as slow as usual
* data-scroll-time = 20 will enable TurtleMode



<br/>

## Change Webflow Default Container Size

```css
.w-container {
	max-width: 1140px; }
}
```

<br/>

## Change Webflow Default Slider Dots
```css
.w-slider-dot {
	background: teal;font-size: 20px;
}
.w-slider-dot.w-active {
	background: aqua;
	font-size: 20px;
}
```