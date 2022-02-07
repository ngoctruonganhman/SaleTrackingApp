import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainer, Loading, ChartsContainer } from '../../components'

const Stats = () => {
  const { showStats, isLoading, saleCommission } = useAppContext()

  useEffect(() => {
    showStats()
  }, [])
  if (isLoading) {
    return <Loading center />
  }
  return (
    <>
     
      {saleCommission.length > 0 && <ChartsContainer />}
    </>
  )
}

export default Stats
