import{_ as i,M as o,p as l,q as u,R as n,t as s,N as t,Q as a,V as r,a1 as e}from"./framework-e03faf0e.js";const k={},d=n("h1",{id:"utilities",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#utilities","aria-hidden":"true"},"#"),s(" Utilities")],-1),m={href:"https://on.cypress.io",target:"_blank",rel:"noopener noreferrer"},v={id:"cypress",tabindex:"-1"},b=n("a",{class:"header-anchor",href:"#cypress","aria-hidden":"true"},"#",-1),g={href:"https://on.cypress.io/_",target:"_blank",rel:"noopener noreferrer"},h=n("p",null,[s("To call a lodash method, use the "),n("code",null,"Cypress._.method()"),s(" command.")],-1),f=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token string">&#39;https://jsonplaceholder.cypress.io/users&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> ids <span class="token operator">=</span> Cypress<span class="token punctuation">.</span>_<span class="token punctuation">.</span><span class="token function">chain</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>body<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>ids<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>deep<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),y={id:"cypress-1",tabindex:"-1"},_=n("a",{class:"header-anchor",href:"#cypress-1","aria-hidden":"true"},"#",-1),w={href:"https://on.cypress.io/$",target:"_blank",rel:"noopener noreferrer"},x=n("p",null,[s("To call a jQuery method, use the "),n("code",null,"Cypress.$"),s(" command.")],-1),q=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>list-group utility-jquery<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>list-group-item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>badge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
    Watches
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>list-group-item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>badge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>14<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
    Sweaters
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>list-group-item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>badge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>22<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
    Scarves
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  document
    <span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;li.list-group-item&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> $li <span class="token operator">=</span> Cypress<span class="token punctuation">.</span><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;.utility-jquery li:first&#39;</span><span class="token punctuation">)</span>

cy<span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span>$li<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;not.have.class&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.class&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),C={id:"cypress-blob",tabindex:"-1"},j=n("a",{class:"header-anchor",href:"#cypress-blob","aria-hidden":"true"},"#",-1),B={href:"https://on.cypress.io/blob",target:"_blank",rel:"noopener noreferrer"},S=n("p",null,[s("To work with blobs, convert strings, and other utility functions, use the "),n("code",null,"Cypress.Blob"),s(" library.")],-1),T=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>utility-blob<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.utility-blob&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">$div</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
  <span class="token comment">// https://github.com/nolanlawson/blob-util#imgSrcToDataURL</span>
  <span class="token comment">// get the dataUrl string for the javascript-logo</span>
  Cypress<span class="token punctuation">.</span>Blob<span class="token punctuation">.</span><span class="token function">imgSrcToDataURL</span><span class="token punctuation">(</span>
    <span class="token string">&#39;https://example.cypress.io/assets/img/javascript-logo.png&#39;</span><span class="token punctuation">,</span>
    <span class="token keyword">undefined</span><span class="token punctuation">,</span>
    <span class="token string">&#39;anonymous&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">dataUrl</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// create an &#39;&lt;img /&gt;&#39; element and set its src to the dataUrl</span>
    <span class="token keyword">let</span> img <span class="token operator">=</span> Cypress<span class="token punctuation">.</span><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;img /&gt;&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">src</span><span class="token operator">:</span> dataUrl <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// need to explicitly return cy here since we are initially returning</span>
    <span class="token comment">// the Cypress.Blob.imgSrcToDataURL promise to our test</span>
    <span class="token comment">// append the image</span>
    $div<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span>

    cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.utility-blob img&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.attr&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;src&#39;</span><span class="token punctuation">,</span> dataUrl<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),L={id:"cypress-minimatch",tabindex:"-1"},U=n("a",{class:"header-anchor",href:"#cypress-minimatch","aria-hidden":"true"},"#",-1),$={href:"https://on.cypress.io/minimatch",target:"_blank",rel:"noopener noreferrer"},N=n("p",null,[s("To test out glob patterns against strings, use the "),n("code",null,"Cypress.minimatch"),s(" library.")],-1),R=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> matching <span class="token operator">=</span> Cypress<span class="token punctuation">.</span><span class="token function">minimatch</span><span class="token punctuation">(</span>
  <span class="token string">&#39;/users/1/comments&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;/users/*/comments&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">matchBase</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>

<span class="token function">expect</span><span class="token punctuation">(</span>matching<span class="token punctuation">,</span> <span class="token string">&#39;matching wildcard&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>be<span class="token punctuation">.</span><span class="token boolean">true</span>

matching <span class="token operator">=</span> Cypress<span class="token punctuation">.</span><span class="token function">minimatch</span><span class="token punctuation">(</span>
  <span class="token string">&#39;/users/1/comments/2&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;/users/*/comments&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">matchBase</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
<span class="token function">expect</span><span class="token punctuation">(</span>matching<span class="token punctuation">,</span> <span class="token string">&#39;comments&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>be<span class="token punctuation">.</span><span class="token boolean">false</span>

<span class="token comment">// ** matches against all downstream path segments</span>
matching <span class="token operator">=</span> Cypress<span class="token punctuation">.</span><span class="token function">minimatch</span><span class="token punctuation">(</span>
  <span class="token string">&#39;/foo/bar/baz/123/quux?a=b&amp;c=2&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;/foo/**&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">matchBase</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
<span class="token function">expect</span><span class="token punctuation">(</span>matching<span class="token punctuation">,</span> <span class="token string">&#39;comments&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>be<span class="token punctuation">.</span><span class="token boolean">true</span>

<span class="token comment">// whereas * matches only the next path segment</span>

matching <span class="token operator">=</span> Cypress<span class="token punctuation">.</span><span class="token function">minimatch</span><span class="token punctuation">(</span>
  <span class="token string">&#39;/foo/bar/baz/123/quux?a=b&amp;c=2&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;/foo/*&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">matchBase</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
<span class="token function">expect</span><span class="token punctuation">(</span>matching<span class="token punctuation">,</span> <span class="token string">&#39;comments&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>be<span class="token punctuation">.</span><span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),V={id:"cypress-promise",tabindex:"-1"},E=n("a",{class:"header-anchor",href:"#cypress-promise","aria-hidden":"true"},"#",-1),P={href:"https://on.cypress.io/promise",target:"_blank",rel:"noopener noreferrer"},D={href:"https://github.com/petkaantonov/bluebird",target:"_blank",rel:"noopener noreferrer"},O=n("code",null,"Cypress.Promise",-1),Q=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> waited <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@return</span> Bluebird&lt;string&gt;
 */</span>
<span class="token keyword">function</span> <span class="token function">waitOneSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// return a promise that resolves after 1 second</span>
  <span class="token comment">// @ts-ignore TS2351 (new Cypress.Promise)</span>
  <span class="token comment">// eslint-disable-next-line no-unused-vars</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Cypress<span class="token punctuation">.</span>Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// set waited to true</span>
      waited <span class="token operator">=</span> <span class="token boolean">true</span>

      <span class="token comment">// resolve with &#39;foo&#39; string</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

cy<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
  <span class="token comment">// return a promise to cy.then() that</span>
  <span class="token comment">// is awaited until it resolves</span>
  <span class="token comment">// @ts-ignore TS7006</span>
  <span class="token function">waitOneSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>waited<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>be<span class="token punctuation">.</span><span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>

<span class="token comment">// you can also wait on a promise from the application code</span>
<span class="token comment">// using https://on.cypress.io/wrap</span>
cy<span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span><span class="token function">waitOneSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;equal&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function z(I,M){const p=o("ExternalLinkIcon"),c=o("RouterLink");return l(),u("div",null,[d,n("p",null,[s("Examples of the use of methods from other commonly used libraries in Cypress, for a full reference of commands, go to "),n("a",m,[s("docs.cypress.io"),t(p)])]),a(" prettier-ignore-start "),n("h2",v,[b,s(),n("a",g,[s("Cypress._"),t(p)])]),a(" prettier-ignore-end "),h,a(" fiddle lodash "),f,a(" fiddle-end "),a(" prettier-ignore-start "),n("h2",y,[_,s(),n("a",w,[s("Cypress.$"),t(p)])]),a(" prettier-ignore-end "),x,a(" fiddle jQuery "),q,a(" fiddle-end "),n("h2",C,[j,s(),n("a",B,[s("Cypress.Blob"),t(p)])]),S,a(" fiddle blob "),T,a(" fiddle-end "),n("h2",L,[U,s(),n("a",$,[s("Cypress.minimatch"),t(p)])]),N,a(" fiddle minimatch "),R,n("p",null,[s("See also: "),t(c,{to:"/recipes/minimatch-unit-tests.html"},{default:r(()=>[s("Minimatch unit tests")]),_:1}),s(" recipe.")]),a(" fiddle-end "),n("h2",V,[E,s(),n("a",P,[s("Cypress.Promise"),t(p)])]),n("p",null,[s("To instantiate a new "),n("a",D,[s("Bluebird"),t(p)]),s(" promise, use "),O,s(".")]),a(" fiddle promise "),Q,a(" fiddle-end ")])}const A=i(k,[["render",z],["__file","index.html.vue"]]);export{A as default};