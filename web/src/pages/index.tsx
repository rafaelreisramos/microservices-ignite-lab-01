import type { GetServerSideProps } from "next"
import { getAccessToken, getSession, useUser } from "@auth0/nextjs-auth0"

const Index = () => {
  // const { user } = useUser()
  // return (
  //   <div>
  //     <h1>Hello Next.js</h1>
  //     <pre>{JSON.stringify(user, null, 2)}</pre>
  //     <a href="/api/auth/login">Login</a>
  //   </div>
  // )
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const token = await getAccessToken(req, res)

  // console.log(token)

  // return {
  //   props: {},
  // }
  const token = await getAccessToken(req, res)
  console.log(token)
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
