import type { GetServerSideProps } from "next"
import { getSession } from "@auth0/nextjs-auth0"

const Index = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res)

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    }
  }

  return {
    redirect: {
      destination: "/app",
      permanent: false,
    },
  }
}

export default Index
