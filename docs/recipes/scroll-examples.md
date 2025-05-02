# Scroll Examples

## Scroll horizontally

<!-- fiddle Horizontal scroll -->

```html hide
<div id="scrollable-horizontal">
    <div style="width: 3000px">
      <ul>
        <li class="square100">1</li>
        <li class="square100">2</li>
        <li class="square100">3</li>
        <li class="square100">4</li>
        <li class="square100">5</li>
        <li class="square100">6</li>
        <li class="square100">7</li>
        <li class="square100">8</li>
      </ul>
    </div>
  </div>
</div>
```

```css hide
#scrollable-horizontal {
  height: 250px;
  width: 400px;
  overflow: auto;
}

.square100 {
  width: 100px;
  height: 100px;
  background-color: teal;
}

#scroll-horizontal,
#scrollable-horizontal {
  background-color: #ddd;
  border: 1px solid #777;
  border-radius: 4px;
  margin-bottom: 15px;
}

#scrollable-horizontal ul {
  padding: 0;
  overflow: auto;
}

#scrollable-horizontal ul > li {
  list-style: none;
  margin: 20px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
```

```js

```

<!-- fiddle-end -->
