import{_ as e,M as c,p as i,q as l,R as n,t as s,N as o,Q as a,a1 as p}from"./framework-e03faf0e.js";const u={},r=n("h1",{id:"navigation",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#navigation","aria-hidden":"true"},"#"),s(" Navigation")],-1),d={href:"https://on.cypress.io/api",target:"_blank",rel:"noopener noreferrer"},k={id:"cy-go",tabindex:"-1"},v=n("a",{class:"header-anchor",href:"#cy-go","aria-hidden":"true"},"#",-1),m={href:"https://on.cypress.io/go",target:"_blank",rel:"noopener noreferrer"},g=n("p",null,[s("To go back or forward in the browser's history, use the "),n("code",null,"cy.go()"),s(" command.")],-1),b=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.nav-item&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;Commands&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.dropdown-item&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;Navigation&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

cy<span class="token punctuation">.</span><span class="token function">location</span><span class="token punctuation">(</span><span class="token string">&#39;pathname&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;include&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;navigation&#39;</span><span class="token punctuation">)</span>

cy<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token string">&#39;back&#39;</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">location</span><span class="token punctuation">(</span><span class="token string">&#39;pathname&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;not.include&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;navigation&#39;</span><span class="token punctuation">)</span>

cy<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token string">&#39;forward&#39;</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">location</span><span class="token punctuation">(</span><span class="token string">&#39;pathname&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;include&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;navigation&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// clicking back</span>
cy<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">location</span><span class="token punctuation">(</span><span class="token string">&#39;pathname&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;not.include&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;navigation&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// clicking forward</span>
cy<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">location</span><span class="token punctuation">(</span><span class="token string">&#39;pathname&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;include&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;navigation&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),f={id:"cy-reload",tabindex:"-1"},h=n("a",{class:"header-anchor",href:"#cy-reload","aria-hidden":"true"},"#",-1),y={href:"https://on.cypress.io/reload",target:"_blank",rel:"noopener noreferrer"},_=n("p",null,[s("To reload the page, use the "),n("code",null,"cy.reload()"),s(" command.")],-1),w=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.nav-item&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;Commands&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.dropdown-item&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;Navigation&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

cy<span class="token punctuation">.</span><span class="token function">reload</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// reload the page without using the cache</span>
cy<span class="token punctuation">.</span><span class="token function">reload</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),x={id:"cy-visit",tabindex:"-1"},j=n("a",{class:"header-anchor",href:"#cy-visit","aria-hidden":"true"},"#",-1),N={href:"https://on.cypress.io/visit",target:"_blank",rel:"noopener noreferrer"},C=n("p",null,[s("To visit a remote page, use the "),n("code",null,"cy.visit()"),s(" command.")],-1),L=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// trick: dynamically set base url in this test only</span>
Cypress<span class="token punctuation">.</span><span class="token function">config</span><span class="token punctuation">(</span>
  <span class="token string">&#39;baseUrl&#39;</span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>origin<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/cypress-examples/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>Cypress<span class="token punctuation">.</span>version<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>

<span class="token comment">// Visit any sub-domain of your current domain,</span>
<span class="token comment">// if you set baseUrl option</span>
<span class="token comment">// https://on.cypress.io/best-practices#Setting-a-global-baseUrl</span>

<span class="token comment">// Pass options to the visit</span>
cy<span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span><span class="token string">&#39;/commands/navigation&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token number">50000</span><span class="token punctuation">,</span> <span class="token comment">// increase total time for the visit to resolve</span>
  <span class="token function-variable function">onBeforeLoad</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">contentWindow</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// contentWindow is the remote page&#39;s window object</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>
      <span class="token keyword">typeof</span> contentWindow<span class="token punctuation">,</span>
      <span class="token string">&#39;onBeforeLoad window reference&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span><span class="token string">&#39;object&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">onLoad</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">contentWindow</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// contentWindow is the remote page&#39;s window object</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>
      <span class="token keyword">typeof</span> contentWindow<span class="token punctuation">,</span>
      <span class="token string">&#39;onLoad window reference&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span><span class="token string">&#39;object&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function V(W,B){const t=c("ExternalLinkIcon");return i(),l("div",null,[r,n("p",null,[s("Examples of navigating to pages within your application in Cypress, for a full reference of commands, go to "),n("a",d,[s("docs.cypress.io"),o(t)])]),n("h2",k,[v,s(),n("a",m,[s("cy.go()"),o(t)])]),g,a(" fiddle.export cy.go "),b,a(" fiddle-end "),n("h2",f,[h,s(),n("a",y,[s("cy.reload()"),o(t)])]),_,a(" fiddle.export cy.reload "),w,a(" fiddle-end "),n("h2",x,[j,s(),n("a",N,[s("cy.visit()"),o(t)])]),C,a(" fiddle.export cy.visit "),L,a(" fiddle-end ")])}const T=e(u,[["render",V],["__file","navigation.html.vue"]]);export{T as default};