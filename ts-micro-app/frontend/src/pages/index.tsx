import type { NextPage } from 'next'
import DataList from '../components/DataList/DataList'

const label = { inputProps: { "aria-label": "Switch demo" } };

const Home: NextPage = () => {
  return (
    <>
      <DataList/>
    </>
  )
}

export default Home