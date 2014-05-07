<a href="http://www.520UED.com/UE/">UE</a>
==

一个使用简单，性能高效，组件模块化的JS交互组特效件库。

UE API使用文档请查看：http://www.520ued.com/UE/


<h3>2014-05-07 UE1.0.1发布</h3> 
<hr>
<b>优化功能：</b>
<p>1、为了增强使用，和减少使用者的负担，特别对load.js的调用路径做了优化，调用者无需指定UE.modulePath</p>
<p><b>旧的调用方法：</b></p>
<pre class="lang-js toolbar:false sh_javascript snippet-formatted sh_sourceCode"><ol class="snippet-num"><li><span class="sh_comment">//加载jQuery</span></li><li>UE<span class="sh_symbol">.</span>Load<span class="sh_symbol">.</span><span class="sh_function">js</span><span class="sh_symbol">(</span>UE<span class="sh_symbol">.</span>jsPath<span class="sh_symbol">+</span><span class="sh_string">"jquery-1.8.3"</span><span class="sh_symbol">,</span><span class="sh_keyword">function</span><span class="sh_symbol">()</span><span class="sh_cbracket">{</span></li><li>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sh_comment">//加载Flash模块</span></li><li>&nbsp;&nbsp;&nbsp;&nbsp;UE<span class="sh_symbol">.</span>Load<span class="sh_symbol">.</span><span class="sh_function">js</span><span class="sh_symbol">(</span>UE<span class="sh_symbol">.</span>modulePath <span class="sh_symbol">+</span> <span class="sh_string">"UE.Flash.js"</span><span class="sh_symbol">,</span><span class="sh_keyword">function</span><span class="sh_symbol">()</span><span class="sh_cbracket">{</span></li><li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="sh_comment">//启动Flash Api</span></li><li> <span class="sh_symbol">       .....................</span>    </li><li>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sh_cbracket">}</span><span class="sh_symbol">);</span></li><li><span class="sh_cbracket">}</span><span class="sh_symbol">);</span></li></ol></pre>

<p><b>优化后的调用方法：</b></p>
<pre class="lang-js toolbar:false sh_javascript snippet-formatted sh_sourceCode"><ol class="snippet-num"><li><span class="sh_comment">//加载jQuery</span></li><li>UE<span class="sh_symbol">.</span>Load<span class="sh_symbol">.</span><span class="sh_function">js</span><span class="sh_symbol">(</span><span class="sh_string">"jquery-1.8.3"</span><span class="sh_symbol">,</span><span class="sh_keyword">function</span><span class="sh_symbol">()</span><span class="sh_cbracket">{</span></li><li>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sh_comment">//加载Flash模块</span></li><li>&nbsp;&nbsp;&nbsp;&nbsp;UE<span class="sh_symbol">.</span>Load<span class="sh_symbol">.</span><span class="sh_function">js</span><span class="sh_symbol">(</span> <span class="sh_string">"UE.Flash.js"</span><span class="sh_symbol">,</span><span class="sh_keyword">function</span><span class="sh_symbol">()</span><span class="sh_cbracket">{</span></li><li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="sh_comment">//启动Flash Api</span></li><li> <span class="sh_symbol">       .....................</span>    </li><li>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sh_cbracket">}</span><span class="sh_symbol">);</span></li><li><span class="sh_cbracket">}</span><span class="sh_symbol">);</span></li></ol></pre>
<br>
<br>

<h3>2013-12-25 UE1.0.0发布</h3> 
<hr>
<b>功能：</b>
<p>1、动态加载CSS,JS</p>
<p>2、ajax动态加载功能</p>
<p>3、Flash轮播功能（含手机版轮播）</p>
<p>4、二三级联动菜单</p>
<br>
<br>



<h3>2014-02-28 UE1.1.0发布</h3>
<hr>
<b>新增修复了以下功能：</b>

1、优化了UE组件扩展封装方式，让其扩展性能更加稳定，且高效。

2、新增了JS DEBUG功能，开启debug功能后动态载入的文件后缀名为.js开发模式。
关闭debug功能后动态载入的JS后缀则变为.min.js。
为了更好管理调试版和上线版的JS，所以新增此功能。

