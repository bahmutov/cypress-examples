import{_ as o,M as c,p as i,q as l,R as n,t as s,N as p,Q as a,a1 as e}from"./framework-e03faf0e.js";const u={},r=n("h1",{id:"waiting",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#waiting","aria-hidden":"true"},"#"),s(" Waiting")],-1),k={href:"https://on.cypress.io/api",target:"_blank",rel:"noopener noreferrer"},d={id:"cy-wait",tabindex:"-1"},m=n("a",{class:"header-anchor",href:"#cy-wait","aria-hidden":"true"},"#",-1),v={href:"https://on.cypress.io/wait",target:"_blank",rel:"noopener noreferrer"},g=n("p",null,[s("To wait for a specific amount of time or resource to resolve, use the "),n("code",null,"cy.wait()"),s(" command.")],-1),b=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>form-group<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>form-control wait-input1<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>form-group<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>form-control wait-input2<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>form-group<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>form-control wait-input3<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.wait-input1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token string">&#39;Wait 1000ms after typing&#39;</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.wait-input2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token string">&#39;Wait 1000ms after typing&#39;</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.wait-input3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token string">&#39;Wait 1000ms after typing&#39;</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),f=n("h3",{id:"waiting-does-not-change-the-subject",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#waiting-does-not-change-the-subject","aria-hidden":"true"},"#"),s(" Waiting does not change the subject")],-1),h=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wait-subject<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>The subject<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;equal&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Hello&#39;</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#wait-subject&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;The subject&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// if there is no subject, yields undefined</span>
cy<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;equal&#39;</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),w=n("h3",{id:"waiting-for-network",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#waiting-for-network","aria-hidden":"true"},"#"),s(" Waiting for network")],-1),y=n("p",null,"You can wait for a specific route",-1),_=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>network-btn btn btn-primary<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Get Comment<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>network-comment<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">function</span> <span class="token function">getComment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// we fetch all data from this REST json backend</span>
    <span class="token keyword">const</span> root <span class="token operator">=</span> <span class="token string">&#39;https://jsonplaceholder.cypress.io&#39;</span>
    $<span class="token punctuation">.</span><span class="token function">ajax</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>root<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/comments/1</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">&#39;GET&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;.network-comment&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>body<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;.network-btn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">getComment</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Listen to GET to comments/1</span>
cy<span class="token punctuation">.</span><span class="token function">intercept</span><span class="token punctuation">(</span><span class="token string">&#39;GET&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;comments/*&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token string">&#39;getComment&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// we have code that gets a comment when</span>
<span class="token comment">// the button is clicked in scripts.js</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.network-btn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// wait for GET comments/1</span>
cy<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token string">&#39;@getComment&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">its</span><span class="token punctuation">(</span><span class="token string">&#39;response.statusCode&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;eq&#39;</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),q=n("strong",null,"Tip:",-1),j={href:"https://on.cypress.io/best-practices#Unnecessary-Waiting",target:"_blank",rel:"noopener noreferrer"},x=n("h2",{id:"waiting-on-promises",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#waiting-on-promises","aria-hidden":"true"},"#"),s(" Waiting on promises")],-1),T={href:"https://on.cypress.io/wrap",target:"_blank",rel:"noopener noreferrer"},C=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">asyncAdd</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token function-variable function">asyncSub</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">resolve</span><span class="token punctuation">(</span>a <span class="token operator">-</span> b<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

cy<span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span><span class="token function">asyncAdd</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;equal&#39;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span><span class="token function">asyncSub</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;equal&#39;</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),E=n("p",null,"More information:",-1),W={href:"https://www.cypress.io/blog/2019/12/23/asserting-network-calls-from-cypress-tests/",target:"_blank",rel:"noopener noreferrer"},N={href:"https://github.com/cypress-io/cypress-example-recipes#unit-testing",target:"_blank",rel:"noopener noreferrer"},G={href:"https://on.cypress.io/retry-ability",target:"_blank",rel:"noopener noreferrer"};function V(A,B){const t=c("ExternalLinkIcon");return i(),l("div",null,[r,n("p",null,[s("Examples of waiting for an amount of time or resource to resolve in Cypress, for a full reference of commands, go to "),n("a",k,[s("docs.cypress.io"),p(t)])]),n("h2",d,[m,s(),n("a",v,[s("cy.wait()"),p(t)])]),g,a(" fiddle cy.wait() / wait for a specific amount of time"),b,a(" fiddle-end "),f,a(" fiddle cy.wait() / wait keeps the subject "),h,a(" fiddle-end "),w,y,a(" fiddle cy.wait() / waiting for specific route "),_,a(" fiddle-end "),n("p",null,[q,s(" be careful of adding unnecessary wait times, see our "),n("a",j,[s("Best Practices: Unnecessary Waiting"),p(t)]),s(" guide.")]),x,n("p",null,[s("If you want to wait on a promise, use "),n("a",T,[s("cy.wrap()"),p(t)]),s(".")]),a(" fiddle cy.wrap / a promise "),C,a(" fiddle-end "),E,n("ul",null,[n("li",null,[n("a",W,[s("Asserting Network Calls from Cypress Tests"),p(t)]),s(" blog post")]),n("li",null,[n("a",N,[s("Unit testing application code"),p(t)]),s(" recipe")]),n("li",null,[s("Avoid hard-coded waits using built-in "),n("a",G,[s("retry-ability"),p(t)])])])])}const $=o(u,[["render",V],["__file","waiting.html.vue"]]);export{$ as default};