import{_ as o,M as p,p as l,q as i,Q as e,R as a,t as s,N as t,a1 as c}from"./framework-e03faf0e.js";const r={},u=a("h1",{id:"escape-selector",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#escape-selector","aria-hidden":"true"},"#"),s(" Escape Selector")],-1),d=c(`<p>Imagine the element&#39;s ID has a character that has a special meaning, like <code>:</code>. How do you select this element?</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>person:age<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>42<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>You need to escape the <code>:</code> character. You add a single backslash <code>\\</code> character, but it JavaScript the backslash needs to be escaped too 😃 Thus you use double backslash <code>\\\\</code> before the colon (or some other special characters).</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#person\\\\:age&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;42&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,4),k=a("strong",null,"Tip:",-1),h={href:"https://api.jquery.com/jQuery.escapeSelector/",target:"_blank",rel:"noopener noreferrer"},v=c(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#&#39;</span> <span class="token operator">+</span> Cypress<span class="token punctuation">.</span>$<span class="token punctuation">.</span><span class="token function">escapeSelector</span><span class="token punctuation">(</span><span class="token string">&#39;person:age&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span>
  <span class="token string">&#39;have.text&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;42&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),g={href:"https://youtu.be/oFUuI2jTWjk",target:"_blank",rel:"noopener noreferrer"};function m(_,b){const n=p("ExternalLinkIcon");return l(),i("div",null,[u,e(" fiddle Escape selector "),d,a("p",null,[k,s(" jQuery has the "),a("a",h,[s(".escapeSelector()"),t(n)]),s(" method to do the heavy lifting for you.")]),v,a("p",null,[s("Watch this example recipe in the video "),a("a",g,[s("Escape The Selector"),t(n)]),s(".")]),e(" fiddle-end ")])}const x=o(r,[["render",m],["__file","escape-selector.html.vue"]]);export{x as default};
