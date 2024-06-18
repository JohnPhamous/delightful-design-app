import { Wrapper } from "@/app/components/wrapper";
import { sql } from "@vercel/postgres";
import { Config, Message } from "@/app/types";
import { Home } from "@/app/home";

export const revalidate = 1;

export default async function Page() {
  const [config, messagesQuery] = await Promise.all([
    sql<Config>`SELECT * from config`,
    sql<Message>`SELECT * from messages ORDER by id DESC`,
  ]);

  const currentState = config.rows[0].state;
  const messages = messagesQuery.rows;

  return (
    <Wrapper>
      <Home messages={messages} config={currentState} />
    </Wrapper>
  );
}
