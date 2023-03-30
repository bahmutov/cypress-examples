import{_ as e,M as o,p as c,q as i,Q as a,R as s,t as n,N as l,a1 as t}from"./framework-e03faf0e.js";const u={},r=s("h1",{id:"network-errors",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#network-errors","aria-hidden":"true"},"#"),n(" Network Errors")],-1),k=t(`<h2 id="error-response-from-the-server" tabindex="-1"><a class="header-anchor" href="#error-response-from-the-server" aria-hidden="true">#</a> Error response from the server</h2><p>Let&#39;s say the application is trying to fetch some data from the server. What happens when the server responds with 500 status code.</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fetch-comment<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>btn btn-primary<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  Try fetching a comment
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>result<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// we fetch all data from this REST json backend</span>
    <span class="token keyword">const</span> root <span class="token operator">=</span> <span class="token string">&#39;https://jsonplaceholder.cypress.io&#39;</span>

    <span class="token keyword">function</span> <span class="token function">getComment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      $<span class="token punctuation">.</span><span class="token function">ajax</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>root<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/comments/1</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">&#39;GET&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span>
          <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;.result&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>body<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">.</span>responseJSON<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;.result&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>responseJSON<span class="token punctuation">.</span>error<span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;.result&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token string">&#39;Network error&#39;</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;#fetch-comment&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">getComment</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// stub the fetch request, respond with status code 500</span>
cy<span class="token punctuation">.</span><span class="token function">intercept</span><span class="token punctuation">(</span><span class="token string">&#39;/comments/1&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">statusCode</span><span class="token operator">:</span> <span class="token number">500</span><span class="token punctuation">,</span>
  <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">error</span><span class="token operator">:</span> <span class="token string">&#39;Server has a day off&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#fetch-comment&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;.result&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Server has a day off&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span>
  <span class="token string">&#39;be.visible&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="connection-error" tabindex="-1"><a class="header-anchor" href="#connection-error" aria-hidden="true">#</a> Connection error</h2>`,5),d={href:"https://on.cypress.io/intercept",target:"_blank",rel:"noopener noreferrer"},v=s("code",null,"forceNetworkError",-1),m=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;**connection error**&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// first time return a stub text</span>
<span class="token comment">// second time simulate a network error</span>
<span class="token comment">// but cy.intercepts are applied in reverse order</span>
cy<span class="token punctuation">.</span><span class="token function">intercept</span><span class="token punctuation">(</span><span class="token string">&#39;/comments/1&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">forceNetworkError</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">intercept</span><span class="token punctuation">(</span>
  <span class="token string">&#39;/comments/1&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">times</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token string">&#39;Stub comment&#39;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
<span class="token comment">// click the button and check how the application shows the data</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#fetch-comment&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;.result&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Stub comment&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.visible&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// and then handles the error response</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#fetch-comment&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;.result&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Network error&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.visible&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function b(h,f){const p=o("ExternalLinkIcon");return c(),i("div",null,[r,a(" fiddle cy.intercept() simulates a network error "),k,s("p",null,[n("You can simulate network error (like the connection dropping) using the command "),s("a",d,[n("cy.intercept"),l(p)]),n(" and the "),v,n(" response property.")]),m,a(" fiddle-end ")])}const y=e(u,[["render",b],["__file","network-errors.html.vue"]]);export{y as default};
