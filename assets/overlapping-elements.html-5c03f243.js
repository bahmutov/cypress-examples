import{_ as e,M as p,p as c,q as o,R as n,t as s,N as l,Q as a,a1 as i}from"./framework-e03faf0e.js";const u={},r=n("h1",{id:"overlapping-elements",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#overlapping-elements","aria-hidden":"true"},"#"),s(" Overlapping elements")],-1),k=n("p",null,[s("Sometimes you want to make sure the DOM elements are overlapping or non-overlapping on the page. We can get the bounding rectangle of an element on the page by calling the method "),n("code",null,"getBoundingClientRect"),s(", then compare the two rectangles to see if they overlap. Using it from the Cypress test is simple: get both elements, get their rectangles, compute the overlap boolean, and assert if it matches the expected result. Note, that this version does not retry getting the elements or their rectangles if the assertion fails, thus it is not suitable to check the overlap between moving elements.")],-1),d=n("strong",null,"Video:",-1),v={href:"https://youtu.be/HGju0gZdZ6o",target:"_blank",rel:"noopener noreferrer"},m=i(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>example-container<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>rect A<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>A<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>rect B<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>B<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>rect C<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>C<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.example-container</span> <span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 160px<span class="token punctuation">;</span>
    <span class="token property">margin-top</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.rect</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.A</span> <span class="token punctuation">{</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px red solid<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.B</span> <span class="token punctuation">{</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 120px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px green solid<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.C</span> <span class="token punctuation">{</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px blue solid<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Returns true if two DOM rectangles are overlapping
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>DOMRect<span class="token punctuation">}</span></span> <span class="token parameter">rect1</span> the bounding client rectangle of the first element
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>DOMRect<span class="token punctuation">}</span></span> <span class="token parameter">rect2</span> the bounding client rectangle of the second element
 * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>boolean<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">areOverlapping</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">rect1<span class="token punctuation">,</span> rect2</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// if one rectangle is on the left side of the other</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>rect1<span class="token punctuation">.</span>right <span class="token operator">&lt;</span> rect2<span class="token punctuation">.</span>left <span class="token operator">||</span> rect2<span class="token punctuation">.</span>right <span class="token operator">&lt;</span> rect1<span class="token punctuation">.</span>left<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// if one rectangle is above the other</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>rect1<span class="token punctuation">.</span>bottom <span class="token operator">&lt;</span> rect2<span class="token punctuation">.</span>top <span class="token operator">||</span> rect2<span class="token punctuation">.</span>bottom <span class="token operator">&lt;</span> rect1<span class="token punctuation">.</span>top<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// the rectangles must overlap</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Returns the bounding rectangle of the first DOM
 * element in the given jQuery object.
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">getRectangle</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">$el</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> $el<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// get each element and compute its bounding rectangle</span>
<span class="token comment">// then use the areOverlapping predicate to check</span>
<span class="token comment">// for overlap and assert the result</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.A&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>getRectangle<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">rectA</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.B&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>getRectangle<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">rectB</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.C&#39;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>getRectangle<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">rectC</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// now check which rectangles are overlapping</span>
            <span class="token function">expect</span><span class="token punctuation">(</span>
              <span class="token function">areOverlapping</span><span class="token punctuation">(</span>rectA<span class="token punctuation">,</span> rectB<span class="token punctuation">)</span><span class="token punctuation">,</span>
              <span class="token string">&#39;A and B are overlapping?&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>be<span class="token punctuation">.</span><span class="token boolean">false</span>
            <span class="token function">expect</span><span class="token punctuation">(</span>
              <span class="token function">areOverlapping</span><span class="token punctuation">(</span>rectA<span class="token punctuation">,</span> rectC<span class="token punctuation">)</span><span class="token punctuation">,</span>
              <span class="token string">&#39;A and C are overlapping?&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>be<span class="token punctuation">.</span><span class="token boolean">true</span>
            <span class="token function">expect</span><span class="token punctuation">(</span>
              <span class="token function">areOverlapping</span><span class="token punctuation">(</span>rectB<span class="token punctuation">,</span> rectC<span class="token punctuation">)</span><span class="token punctuation">,</span>
              <span class="token string">&#39;B and C are overlapping?&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>be<span class="token punctuation">.</span><span class="token boolean">true</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Just for completeness, let&#39;s show which rectangles are considered visible by Cypress; I believe currently they all are.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.A&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.visible&#39;</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.B&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.visible&#39;</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.C&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.visible&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function g(b,h){const t=p("ExternalLinkIcon");return c(),o("div",null,[r,k,n("p",null,[d,s(" watch me going through writing this test in the video "),n("a",v,[s("Overlapping Elements"),l(t)]),s(".")]),a(" fiddle Overlapping elements "),m,a(" fiddle-end ")])}const y=e(u,[["render",g],["__file","overlapping-elements.html.vue"]]);export{y as default};
