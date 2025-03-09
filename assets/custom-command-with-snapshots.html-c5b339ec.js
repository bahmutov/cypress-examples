import{_ as e,M as p,p as o,q as c,R as s,t as n,N as l,Q as a,a1 as i}from"./framework-e03faf0e.js";const u="/cypress-examples/assets/replace-text-2-d477c895.png",r={},k=s("h1",{id:"custom-command-with-snapshots",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#custom-command-with-snapshots","aria-hidden":"true"},"#"),n(" Custom Command With Snapshots")],-1),d={href:"https://youtu.be/TxCB1QDw6qY",target:"_blank",rel:"noopener noreferrer"},m=i(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>output<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Some text<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Let&#39;s define a custom command that replaces the text inside the &quot;#output&quot; element. We are not going to simply replace the text, but instead we will replace it twice. We need to see how the element looks after <em>each</em> replacement. Thus our command needs multiple DOM snapshots to see each replacement.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Cypress<span class="token punctuation">.</span>Commands<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;replaceText2&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">text1<span class="token punctuation">,</span> text2</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> log <span class="token operator">=</span> Cypress<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">autoEnd</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">&#39;with two text labels&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">snapshot</span><span class="token punctuation">(</span><span class="token string">&#39;initial&#39;</span><span class="token punctuation">)</span>

  <span class="token comment">// step 1: replace the text</span>
  cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#output&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">log</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">log</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;text&#39;</span><span class="token punctuation">,</span> text1<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// log.snapshot is a synchronous command</span>
      <span class="token comment">// so we want to run it AFTER cy.invoke has finished</span>
      <span class="token comment">// that&#39;s why it is inside cy.then callback</span>
      log<span class="token punctuation">.</span><span class="token function">snapshot</span><span class="token punctuation">(</span><span class="token string">&#39;text 1&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token comment">// step 2: replace the text again</span>
  cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#output&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">log</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">log</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;text&#39;</span><span class="token punctuation">,</span> text2<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      log<span class="token punctuation">.</span><span class="token function">snapshot</span><span class="token punctuation">(</span><span class="token string">&#39;text 2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Let&#39;s try it out.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;#output&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Some text&#39;</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">replaceText2</span><span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Goodbye&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Great, if you pin the &quot;replaceText2&quot; command, you should see multiple DOM snapshot selector. Clicking on the &quot;text 1&quot; label restores the DOM after the element &quot;#output&quot; receives the text label &quot;Hello&quot;.</p><p><img src="`+u+'" alt="The custom command with multiple DOM snapshots"></p>',7);function v(h,g){const t=p("ExternalLinkIcon");return o(),c("div",null,[k,s("p",null,[n("📺 Watch this recipe explained in the video "),s("a",d,[n("Cypress Custom Commands With Multiple DOM Snapshots"),l(t)]),n(".")]),a(" fiddle Custom command with snapshots "),m,a(" fiddle-end ")])}const f=e(r,[["render",v],["__file","custom-command-with-snapshots.html.vue"]]);export{f as default};
