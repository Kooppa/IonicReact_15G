import React, { useState } from 'react';
import ActivitiesContext, { Activity, ActivitiesContextModel, ActivityType } from './activities-context';

const ActivitiesContextProvider: React.FC = (props) => {

    const [activities, setActivities] = useState<Activity[]>([
        {
            id: Math.random().toString(),
            title: 'Cervezas',
            description: 'Las mejores cervezas a precio de camión',
            hour: '$$$',
            activityType: 'cer',
            imageUrl: '/assets/images/cervezas.jpg',
            isCompleted: false
        },
        {
            id: Math.random().toString(),
            title: 'Vinos',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            hour: '$$$',
            activityType: 'vin',
            imageUrl: '/assets/images/vinos.jpg',
            isCompleted: false
        },
        {
            id: Math.random().toString(),
            title: 'Carnes',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
            hour: '$$$',
            activityType: 'car',
            imageUrl: '/assets/images/carnes.jpg',
            isCompleted: false
        }
    ]);

    const addActivity = (title: string, description: string, activityType: ActivityType) => {
        let imageUrl = '';
        switch(activityType) {
            case 'cer':
                imageUrl = '/assets/images/cervezas.jpg'
                break;
            case 'vin':
                imageUrl = '/assets/images/vinos.jpg'
                break;
            case 'car':
                imageUrl = '/assets/images/carnes.jpg'
                break;
            default:
                imageUrl = '/assets/images/cervezas.jpg'
                break;
        };

        const activityDate = new Date();
        const hour = activityDate.getHours() + ':' + activityDate.getMinutes();

        const addActivity: Activity = {
            id: Math.random().toString(),
            title,
            description,
            hour,
            activityType,
            imageUrl,
            isCompleted: false
        };

        setActivities(currActivities => {
            return [...currActivities, addActivity]
        })
    };

    const completeActivity = (activityId: string) => {
        setActivities(currActivities => {
            const updatedActivities = [...currActivities];
            const selectedActivityIndex = activities.findIndex(act => act.id === activityId);
            const updatedActivity = {...updatedActivities[selectedActivityIndex], isCompleted: true};
            updatedActivities[selectedActivityIndex] = updatedActivity;
            return updatedActivities;
        });
    };

    const activitiesContext: ActivitiesContextModel = {
        activities,
        addActivity,
        completeActivity
    };

    return (
        <ActivitiesContext.Provider value={activitiesContext}>
            {props.children}
        </ActivitiesContext.Provider>
    );
};

export default ActivitiesContextProvider;