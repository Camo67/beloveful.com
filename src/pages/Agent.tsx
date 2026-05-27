import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Send, Sparkles } from "lucide-react";
import { useAliCloudAI } from "@/hooks/useAliCloudAI";

type AgentMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const systemPrompt =
  "You are Beloveful Studio Agent. Help manage a travel photography website with concise, practical answers about galleries, workshops, copy, captions, accessibility, and launch tasks.";

export default function Agent() {
  const [model, setModel] = useState("qwen-turbo");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      role: "assistant",
      content: "Beloveful Studio Agent is active. Ask me for captions, workshop copy, launch checks, or site content help.",
    },
  ]);
  const { chat, loading, error } = useAliCloudAI();

  const visibleMessages = useMemo(
    () => messages.filter((message) => message.role !== "system"),
    [messages],
  );

  const handleSubmit = async () => {
    const content = input.trim();
    if (!content || loading) return;

    const nextMessages: AgentMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");

    try {
      const response = await chat([{ role: "system", content: systemPrompt }, ...nextMessages], model, {
        temperature: 0.7,
        maxTokens: 900,
      });

      const assistantText =
        response.output.choices?.[0]?.message.content ||
        response.output.text ||
        "I am active, but I did not receive a text response.";

      setMessages((current) => [...current, { role: "assistant", content: assistantText }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "The agent screen is active, but the AI backend did not answer. Check DASHSCOPE_API_KEY in .dev.vars or Cloudflare secrets.",
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header variant="default" />
      <main>
        <PageContainer className="py-10">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-light">Beloveful Agent</h1>
                <p className="mt-2 text-sm text-neutral-400">AI assistant for site copy, captions, workshops, and launch work.</p>
              </div>
              <div className="flex items-center gap-2 rounded border border-white/15 px-3 py-2 text-sm text-emerald-300">
                <Sparkles className="h-4 w-4" />
                Active
              </div>
            </div>

            <div className="mb-4 max-w-xs">
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="border-white/20 bg-neutral-900 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qwen-turbo">qwen-turbo</SelectItem>
                  <SelectItem value="qwen-plus">qwen-plus</SelectItem>
                  <SelectItem value="qwen-max">qwen-max</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <section className="min-h-[420px] border border-white/10 bg-neutral-900">
              <div className="max-h-[58vh] min-h-[340px] space-y-4 overflow-y-auto p-4">
                {visibleMessages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={message.role === "user" ? "ml-auto max-w-[82%]" : "mr-auto max-w-[82%]"}
                  >
                    <div
                      className={
                        message.role === "user"
                          ? "bg-white px-4 py-3 text-sm leading-6 text-neutral-950"
                          : "border border-white/10 bg-neutral-950 px-4 py-3 text-sm leading-6 text-neutral-100"
                      }
                    >
                      {message.role === "assistant" && (
                        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-500">
                          <Bot className="h-3.5 w-3.5" />
                          Agent
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 p-4">
                {error && <p className="mb-3 text-sm text-red-300">{error}</p>}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                        void handleSubmit();
                      }
                    }}
                    placeholder="Ask the agent..."
                    className="min-h-[88px] border-white/20 bg-neutral-950 text-white placeholder:text-neutral-500"
                  />
                  <Button
                    onClick={() => void handleSubmit()}
                    disabled={loading || !input.trim()}
                    className="h-[88px] shrink-0 gap-2 bg-white px-6 text-neutral-950 hover:bg-neutral-200"
                  >
                    <Send className="h-4 w-4" />
                    {loading ? "Sending" : "Send"}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </PageContainer>
      </main>
      <FooterStrip />
    </div>
  );
}
