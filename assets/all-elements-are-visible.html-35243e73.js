import{_ as c,M as o,p as l,q as i,R as n,t as s,N as p,Q as a,a1 as t}from"./framework-e03faf0e.js";const u={},k=n("h1",{id:"visible-elements",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#visible-elements","aria-hidden":"true"},"#"),s(" Visible elements")],-1),r={href:"https://youtu.be/puCZGCeUb5k",target:"_blank",rel:"noopener noreferrer"},d=n("h2",{id:"at-least-one-is-visible",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#at-least-one-is-visible","aria-hidden":"true"},"#"),s(" At least one is visible")],-1),v=n("p",null,[s("The built-in "),n("code",null,".should('be.visible')"),s(" assertion passes if "),n("em",null,"any"),s(" of the elements are visible.")],-1),g=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>items<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>One<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span>none</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>Two<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Three<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// PASSES even when 1 out of 3 elements is invisible</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#items li&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.visible&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>On the other hand, the assertion <code>.should(&#39;not.be.visible&#39;)</code> requires <em>all</em> elements to be invisible</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// FAILS because 2 out of 3 elements ARE visible</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#items li&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;not.be.visible&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,4),m=n("h2",{id:"check-visibility-of-every-element",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#check-visibility-of-every-element","aria-hidden":"true"},"#"),s(" Check visibility of every element")],-1),b=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>items<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>One<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span>none</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>Two<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Three<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),h={href:"https://on.cypress.io/dom",target:"_blank",rel:"noopener noreferrer"},f=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// FAILS because the middle element has visibility false</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#items li&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">$el</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Cypress<span class="token punctuation">.</span>_<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>$el<span class="token punctuation">,</span> Cypress<span class="token punctuation">.</span>dom<span class="token punctuation">.</span>isVisible<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;deep.equal&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// let&#39;s confirm each element&#39;s visibility</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#items li&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">$el</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Cypress<span class="token punctuation">.</span>_<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>$el<span class="token punctuation">,</span> Cypress<span class="token punctuation">.</span>dom<span class="token punctuation">.</span>isVisible<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;deep.equal&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),y=n("h2",{id:"with-retries-using-cypress-map",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#with-retries-using-cypress-map","aria-hidden":"true"},"#"),s(" With retries using cypress-map")],-1),_=n("code",null,"cy.then",-1),q={href:"https://github.com/bahmutov/cypress-map",target:"_blank",rel:"noopener noreferrer"},j=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>items<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>One<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span>none</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>Two<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Three<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    document
      <span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#items li:nth-child(2)&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;style&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1500</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#items li&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>Cypress<span class="token punctuation">.</span>dom<span class="token punctuation">.</span>isVisible<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;deep.equal&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),x=n("h2",{id:"using-cypress-map-and-chai-each-plugins",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#using-cypress-map-and-chai-each-plugins","aria-hidden":"true"},"#"),s(" Using cypress-map and chai-each plugins")],-1),C=n("p",null,[s("To simplify check that each item in the visibility array is "),n("code",null,"true"),s(", you can use the Chai plugin "),n("a",{href:""},"chai-each")],-1),T=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>items<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>One<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span>none</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>Two<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Three<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    document
      <span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#items li:nth-child(2)&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;style&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1500</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In your support file, load and register the <code>chai-each</code> plugin</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// https://www.chaijs.com/plugins/chai-each/</span>
chai<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;chai-each&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Use the <code>each.equal</code> assertion to make sure that every element of the visibility array is <code>true</code>.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#items li&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>Cypress<span class="token punctuation">.</span>dom<span class="token punctuation">.</span>isVisible<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;each.equal&#39;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function w(A,V){const e=o("ExternalLinkIcon");return l(),i("div",null,[k,n("p",null,[s("📺 Watch this recipe explained at "),n("a",r,[s("How To Check Visibility Of Many Elements"),p(e)]),s(".")]),d,v,a(" fiddle Any elements are visible "),g,a(" fiddle-end "),m,a(" fiddle All elements should be visible "),b,n("p",null,[s("Let's compute visibility of every element using built-in "),n("a",h,[s("Cypress.dom.isVisible"),p(e)]),s(" method:")]),f,a(" fiddle-end "),y,n("p",null,[s("Unfortunately, because of "),_,s(" command, the above snippet does not retry. A better solution would be to use Cypress queries. For example, you could use "),n("a",q,[s("cypress-map"),p(e)])]),a(" fiddle All elements become visible using cypress-map "),j,a(" fiddle-end "),x,C,a(" fiddle All elements become visible with chai-each "),T,a(" fiddle-end ")])}const E=c(u,[["render",w],["__file","all-elements-are-visible.html.vue"]]);export{E as default};