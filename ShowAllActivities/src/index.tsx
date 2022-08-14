import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';

import { getByName, getByProps } from 'enmity/metro';
const UserActivity = getByName('ue', { default: false });
const UserStatusStore = getByProps('getStatus', 'getState');

const Patcher = create('show-all-activities');

const ShowAllActivities: Plugin = {
   ...manifest,

   onStart() {
      Patcher.instead(UserActivity, 'default', (self, [props], orig) => {
         const activities = UserStatusStore.getActivities(props.user.id).filter(activity => activity.type !== 4); // ignore CUSTOM_STATUS
         if (activities.length <= 1) return orig.apply(self, [props]);

         return activities.map((activity, index) =>
            orig.apply(self, [{ ...props, activity, stream: (index === 0 ? props.stream : null) }])
         );
      });
   },

   onStop() {
      Patcher.unpatchAll();
   }
};

registerPlugin(ShowAllActivities);
