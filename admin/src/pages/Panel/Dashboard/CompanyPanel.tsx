import React, { useState } from 'react'
import { DashboardLoaders } from '../../../services/common/Actions';
import DashboardServices from '../../../services/DashboardServices';
import { notifyError } from '../../../utils/toast';
import Counter from '../../../components/statistics/Counter';
import { AiOutlineTags } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { TbCrystalBall, TbShoppingBag } from 'react-icons/tb';
import StatsSkeleton from '../../../components/skeleton/StatsSkeleton';
import LineCharts from '../../../components/charts/LineCharts';
import DoughnutComponent from '../../../components/charts/DoughnutChart';
import AdminProgress from '../../../components/listedItem/AdminProgress';
import ActionButton from '../../../components/templates/Button/ActionButton';
import { GrCloudDownload } from 'react-icons/gr';
import StatsFilter from '../../../components/modal/StatsFilter';

const CompanyPanel = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    console.log(data);

    React.useEffect(() => {
        const fetchStats = async () => {
            setLoading(true)
            const response = await DashboardLoaders.fetchLoaderData(DashboardServices.companyStats('2023-10-28'))
            if (response?.data) {
                setData(response.data)
            } else {
                notifyError("Something went wrong!")
            }
            setLoading(false);
        }
        fetchStats();
        return () => { }
    }, []);
    if (isLoading) return <StatsSkeleton />
    if (!data) return <h1>No Label Data Found</h1>

    const monthData = (monthList: any) => {
        let monthKey = Object.keys(monthList);
        let monthLabelCount = Object.values(data.monthLabelCounts);

        return { monthKey, monthLabelCount }
    }
    const { monthKey, monthLabelCount } = monthData(data.monthLabelCounts);

    const adminLabelData = (adminData: any) => {
        let adminlabelCount = adminData.map((i: any) => i.count)
        let labelAdmin = adminData.map((i: any) => i.name)

        return { adminlabelCount, labelAdmin }
    }
    const { adminlabelCount, labelAdmin } = adminLabelData(data.userLabelCounts);

    return (
        <main>
            <section className='grid md:grid-cols-4 grid-cols-1 gap-5 px-10 mt-10 mb-5'>
                <Counter Icon={MdOutlineAdminPanelSettings} bgColor='#fef5e5' color='#e89200' count={data.stats.adminCount} title='Admins' />
                <Counter Icon={TbCrystalBall} bgColor='#ecf2ff' color='#5E87FF' count={data.stats.brandsCount} title='Brands' />
                <Counter Icon={TbShoppingBag} bgColor='#e8f7ff' color='#49BEFF' count={data.stats.productsCount} title='Products' />
                <Counter Icon={AiOutlineTags} bgColor='#fdede8' color='#fa896b' count={data.stats.labelCount} title='Labels' />
            </section>

            <aside className='grid md:grid-cols-6 grid-cols-1 h-96 gap-5 pt-0 p-10'>
                <section className='flex flex-col justify-between bg-white gap-8 h-96 md:col-span-4 col-span-1 rounded-xl shadow-lg py-10 px-5'>
                    <article className='flex justify-between'>
                        <div>
                            <h4 className='text-xl text-primaryDarkGray font-semibold'>Label Creation Trends</h4>
                            <h6 className='text-sm text-gray-500 tracking-wide'>Overview of Creation</h6>
                        </div>
                        <div>
                            <StatsFilter
                                buttonTitle="label-filter"
                                buttonLayout={
                                    <ActionButton
                                        Icon={GrCloudDownload}
                                        bg="bg-greenish hover:bg-greenish hover:text-blue-500 max-sm:bg-danger max-sm:text-white max-sm:w-full"
                                        title={`Download CSV`}
                                        onClick={() => null}
                                    />
                                }
                            />
                        </div>
                    </article>

                    <article className='flex w-full'>
                        <div className="w-4/5">
                            <LineCharts labels={monthKey} dataElement={monthLabelCount} />
                        </div>
                        <div className="w-1/5">
                            <h5 className='text-xl text-center bg-greenish rounded-full p-1'>{data.stats.labelCount}</h5>
                        </div>
                    </article>
                </section>

                <section className='bg-white h-96 md:col-span-2 col-span-1 rounded-xl shadow-lg space-y-5 py-10 px-5'>
                    <article>
                        <h4 className='text-md text-primaryDarkGray font-semibold'>Label Creation Breakups</h4>
                    </article>

                    <article>
                        <DoughnutComponent labels={labelAdmin} dataElement={adminlabelCount} />

                        <AdminProgress data={data.userLabelCounts} />
                    </article>
                </section>
            </aside>
        </main>
    )
}

export default CompanyPanel
