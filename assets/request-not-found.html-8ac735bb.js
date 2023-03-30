import{_ as i,M as e,p as l,q as u,R as s,t as n,N as a,Q as o,V as r,a1 as p}from"./framework-e03faf0e.js";const d={},k=s("h1",{id:"requested-resource-not-found",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#requested-resource-not-found","aria-hidden":"true"},"#"),n(" Requested resource not found")],-1),m={href:"https://on.cypress.io/request",target:"_blank",rel:"noopener noreferrer"},v={href:"https://youtu.be/in0ZXw1JtJQ",target:"_blank",rel:"noopener noreferrer"},b=s("p",null,[n("First, let's look at an "),s("em",null,"incorrect"),n(" solution.")],-1),h=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 🚨 INCORRECT, this will NOT WORK, just for DEMO</span>
<span class="token keyword">function</span> <span class="token function">getTodo</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> serverUrl <span class="token operator">=</span> <span class="token string">&#39;https://jsonplaceholder.cypress.io&#39;</span>
  cy<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>serverUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/todos/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">its</span><span class="token punctuation">(</span><span class="token string">&#39;body&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// if the Todo is not found, return an error</span>
  <span class="token keyword">return</span> <span class="token string">&#39;Todo not found&#39;</span>
<span class="token punctuation">}</span>
<span class="token function">getTodo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The above function <code>getTodo</code> schedules the <code>cy.request</code> command to run by adding it to the Cypress command queue. The <code>getTodo</code> also returns a string right away - probably not something you expect. Instead you want to return <em>the Cypress command</em> to let you attach more commands and assertions.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 🚨 SLIGHTLY BETTER solution</span>
<span class="token comment">// DOES NOT HANDLE 404 responses</span>
<span class="token keyword">function</span> <span class="token function">getTodo</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> serverUrl <span class="token operator">=</span> <span class="token string">&#39;https://jsonplaceholder.cypress.io&#39;</span>
  <span class="token keyword">return</span> cy<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>serverUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/todos/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">its</span><span class="token punctuation">(</span><span class="token string">&#39;body&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// Hmm, we will never get here. How do we handle</span>
  <span class="token comment">// a response from the server &quot;Todo not found&quot;?</span>
  <span class="token keyword">return</span> <span class="token string">&#39;Todo not found&#39;</span>
<span class="token punctuation">}</span>
<span class="token comment">// getTodos now returns a Cypress command, so we can validate</span>
<span class="token comment">// the value it yields when the request completes</span>
<span class="token function">getTodo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;deep.include&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// we know only some properties from the object</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">userId</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token comment">// continue working with the yielded Todo object</span>
  <span class="token punctuation">.</span><span class="token function">its</span><span class="token punctuation">(</span><span class="token string">&#39;title&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The above approach is slightly better. Now let&#39;s add handling of 404 response.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// ✅ Good utility function</span>
<span class="token comment">// that handles 404 responses and yields the object</span>
<span class="token keyword">function</span> <span class="token function">getTodo</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> serverUrl <span class="token operator">=</span> <span class="token string">&#39;https://jsonplaceholder.cypress.io&#39;</span>
  <span class="token keyword">return</span> cy
    <span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>serverUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/todos/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">failOnStatusCode</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">404</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&#39;Todo not found&#39;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> response<span class="token punctuation">.</span>body
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">getTodo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;deep.include&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// we know only some properties from the object</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">userId</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token comment">// continue working with the yielded Todo object</span>
  <span class="token punctuation">.</span><span class="token function">its</span><span class="token punctuation">(</span><span class="token string">&#39;title&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// asking for resource that does not exist</span>
<span class="token function">getTodo</span><span class="token punctuation">(</span><span class="token string">&#39;does-not-exist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;equal&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Todo not found&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="bonus-compare-two-responses" tabindex="-1"><a class="header-anchor" href="#bonus-compare-two-responses" aria-hidden="true">#</a> Bonus: compare two responses</h2><p>Let&#39;s get two Todo items and check their responses to confirm they are the same. You can nest <code>cy.then</code> callbacks to get both objects before comparing them.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">getTodo</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">first</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">getTodo</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">+</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">second</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>first<span class="token punctuation">,</span> <span class="token string">&#39;todos are equal&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>deep<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>second<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),g=s("code",null,"function () {...}",-1),f=s("code",null,"this.<alias>",-1),y=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">getTodo</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token string">&#39;first&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// by using &quot;function () {...}&quot; callback</span>
    <span class="token comment">// we get access to the test context object via &quot;this&quot;</span>
    <span class="token comment">// that&#39;s where every alias created using cy.as command</span>
    <span class="token comment">// is available as a property</span>
    <span class="token function">getTodo</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">+</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;deep.equal&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>first<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function w(_,T){const t=e("ExternalLinkIcon"),c=e("RouterLink");return l(),u("div",null,[k,s("p",null,[n("Sometimes you use "),s("a",m,[n("cy.request"),a(t)]),n(' to get a resource that might not exist. The server returns 404 and the command fails. In this recipe, I show how to deal with this error by abstracting it away in an utility function. You can read this recipe or watch the video "'),s("a",v,[n("Return Cypress Chain"),a(t)]),n('".')]),b,o(" fiddle cy.request() - handle an error response "),h,s("p",null,[n("We can also save the first response under "),a(c,{to:"/commands/aliasing.html"},{default:r(()=>[n("an alias")]),_:1}),n(" and use "),g,n(" callback to be able to access the first response using "),f,n(":")]),y,o(" fiddle-end ")])}const q=i(d,[["render",w],["__file","request-not-found.html.vue"]]);export{q as default};
