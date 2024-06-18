import { Wrapper } from "@/app/components/wrapper";
import { sql } from "@vercel/postgres";
import { Config } from "@/app/types";
import { AdminButtons } from "@/app/admin/components";

export const revalidate = 1;

export default async function Page() {
  const [config] = await Promise.all([sql<Config>`SELECT * from config`]);

  const currentState = config.rows[0].state;

  return (
    <Wrapper>
      <AdminButtons state={currentState} />
    </Wrapper>
  );
}
