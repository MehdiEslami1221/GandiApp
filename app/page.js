import { generateMetadata } from '@/app/components/utility/metadata';
import Layout from "@/app/components/Layout";

export const metadata = generateMetadata();
export default function Home() {
  return (
      <>
          <Layout />
      </>
  )
}