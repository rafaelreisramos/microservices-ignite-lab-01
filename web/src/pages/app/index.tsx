import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import { NextPage } from "next"
import { useMeQuery } from "../../graphql/generated/graphql"
import { ssrGetProducts } from "../../graphql/generated/page"
import { withApollo } from "../../lib/withApollo"

const Home: NextPage = () => {
  const { user } = useUser()
  const { data: me } = useMeQuery()

  return (
    <div>
      <h1>Hello Next.js</h1>
      <pre>{JSON.stringify(me, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return { props: {} }
  },
})

export default withApollo(ssrGetProducts.withPage()(Home))
