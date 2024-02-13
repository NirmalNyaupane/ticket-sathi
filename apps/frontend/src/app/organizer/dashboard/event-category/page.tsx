import CategoryCard from '@/components/card/CategoryCard';
import GlobalDialog from '@/components/common/Dialog/GlobalDialog';
import DashboardTopContent from '@/components/organizer/dashboard/DashboardTopContent'
import CategoryModal from '@/components/organizer/dashboard/modals/CategoryModal';
import { Button } from '@/components/ui/button';
import React from 'react'

const EventCategory = () => {
    return (
        <div>
            <DashboardTopContent text={"Event Category"}
                section3={<GlobalDialog dialogTitle='Add Event Category'
                    dialogButton={<Button>Add Category</Button>}
                ><CategoryModal action="create" /></GlobalDialog>
                } />
            <main className='grid' style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "2rem",
            }}>
                <CategoryCard id={'ead343-90ik-34ojo-342'} categoryName={'Test Category'} totalEvent={0} description={'deorjworwo rwoir jworj weor'} />
                <CategoryCard id={'ead343-90ik-34ojo-342'} categoryName={'Test Category'} totalEvent={0} description={'deorjworwo rwoir jworj weor'} />
                <CategoryCard id={'ead343-90ik-34ojo-342'} categoryName={'Test Category'} totalEvent={0} description={'deorjworwo rwoir jworj weor'} />
                <CategoryCard id={'ead343-90ik-34ojo-342'} categoryName={'Test Category'} totalEvent={0} description={'deorjworwo rwoir jworj weor'} />
                <CategoryCard id={'ead343-90ik-34ojo-342'} categoryName={'Test Category'} totalEvent={0} description={'deorjworwo rwoir jworj weor'} />
                <CategoryCard id={'ead343-90ik-34ojo-342'} categoryName={'Test Category'} totalEvent={0} description={'deorjworwo rwoir jworj weor'} />
            </main>
        </div>
    )
}

export default EventCategory;