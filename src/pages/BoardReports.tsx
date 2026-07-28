import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { FileText, Download, Printer } from "lucide-react";

export function BoardReports() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-3xl font-tech font-bold tracking-wider text-cyber-text uppercase text-glow animate-molten-text">Board Report</h1>
          <p className="text-cyber-text-secondary text-sm mt-1 font-code">{"// STRATEGIC OVERVIEW FOR STAKEHOLDERS"}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded border border-cyber-border bg-cyber-bg-darker hover:bg-cyber-bg-hover text-cyber-text-secondary hover:text-cyber-text text-xs font-code transition-colors">
            <Printer className="h-4 w-4" />
            PRINT
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded border border-cyber-primary/30 bg-cyber-primary/10 text-cyber-primary hover:bg-cyber-primary/20 text-xs font-code font-bold shadow-[0_0_15px_rgba(255,90,31,0.1)] transition-all">
            <Download className="h-4 w-4" />
            EXPORT PDF
          </button>
        </div>
      </div>

      <Card className="bg-cyber-bg-darker/30 border-cyber-border/50">
        <CardContent className="p-8 md:p-12 prose prose-invert max-w-none prose-headings:font-tech prose-headings:tracking-wide prose-headings:text-cyber-text prose-p:text-cyber-text-secondary prose-p:leading-relaxed prose-li:text-cyber-text-secondary marker:text-cyber-primary">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-cyber-border/30">
            <div className="p-4 rounded-xl border bg-cyber-bg-dark border-cyber-primary/30 text-cyber-primary shadow-[0_0_15px_rgba(255,90,31,0.15)]">
              <FileText className="h-8 w-8 relative z-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold m-0 text-cyber-text">Why We Optimize Beyond Google</h1>
              <p className="text-cyber-primary font-code uppercase tracking-widest mt-2 m-0 text-sm">Executive Summary</p>
            </div>
          </div>

          <p className="text-lg text-cyber-text">
            Search is no longer controlled by a single company. Different countries, industries, and user communities rely on different search engines and AI systems. Our objective is to ensure that ClearPathTrader is discoverable wherever prospective users search for trading education and market analysis.
          </p>

          <h2 className="text-2xl mt-12 mb-6 border-l-4 border-cyber-primary pl-4">Why this matters</h2>
          
          <h3 className="text-xl text-cyber-secondary mt-8">Global Reach</h3>
          <ul className="space-y-2 mt-4 list-disc pl-6">
            <li>Google is dominant in many markets, but it is not the only gateway.</li>
            <li>Bing powers additional search experiences through partners.</li>
            <li>Yandex is significant for Russian-speaking users.</li>
            <li>Baidu is essential for Chinese-language discovery.</li>
            <li>Privacy-focused users increasingly use Brave Search and DuckDuckGo.</li>
          </ul>

          <h3 className="text-xl text-cyber-secondary mt-8">Business Benefits</h3>
          <ul className="space-y-2 mt-4 list-disc pl-6">
            <li>Diversifies our discovery channels rather than depending on one search provider.</li>
            <li>Reduces long-term customer acquisition costs through organic traffic.</li>
            <li>Strengthens brand credibility across multiple ecosystems.</li>
            <li>Builds resilience against algorithm changes from any single platform.</li>
            <li>Expands opportunities for partnerships and international growth.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-6 border-l-4 border-cyber-primary pl-4">What we are investing in</h2>
          <ul className="space-y-2 mt-4 list-disc pl-6">
            <li>Webmaster verification across major search engines.</li>
            <li>High-quality educational content.</li>
            <li>Regional landing pages and multilingual resources.</li>
            <li>Strong internal linking and site architecture.</li>
            <li>External authority through legitimate backlinks.</li>
            <li>Fast indexing using supported technologies such as IndexNow where applicable.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-6 border-l-4 border-cyber-danger pl-4">What we are not doing</h2>
          <ul className="space-y-2 mt-4 list-disc pl-6">
            <li>Publishing large volumes of thin or low-value pages.</li>
            <li>Generating artificial or misleading content.</li>
            <li>Assuming one indexing technology solves visibility across all search engines.</li>
            <li>Pursuing rankings at the expense of quality.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-6 border-l-4 border-cyber-success pl-4">Success Metrics</h2>
          <ul className="space-y-2 mt-4 list-disc pl-6">
            <li>Growth in indexed pages.</li>
            <li>Growth in qualified organic traffic.</li>
            <li>Improved rankings for strategic keywords.</li>
            <li>Increased international visibility.</li>
            <li>Increased citations by AI assistants and search platforms.</li>
            <li>Higher engagement with educational content.</li>
          </ul>

          <div className="mt-16 p-6 rounded-lg bg-cyber-bg-dark border border-cyber-primary/20 shadow-[inset_0_0_20px_rgba(255,90,31,0.05)]">
            <h2 className="text-xl m-0 mb-4 text-cyber-primary font-code uppercase">Why this fits MyEyes</h2>
            <p className="m-0 italic text-cyber-text-secondary">
              What you've outlined isn't just an SEO checklist—it's an operational strategy. MyEyes can become the single command center where executives, marketers, developers, and content teams all see the same picture: which search ecosystems you're connected to, what needs attention, and how those efforts contribute to ClearPathTrader's global growth. That makes it far more valuable than a collection of webmaster tools because it provides one place to manage and communicate the entire search and discovery strategy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
