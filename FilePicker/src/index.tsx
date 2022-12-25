import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import manifest from '../manifest.json';

import { getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher';

const { ExperimentStore } = getByProps('useAndTrackExposureToUserExperiment');

const Patcher = create('file-picker');

const FilePicker: Plugin = {
   ...manifest,

   onStart() {
      Patcher.after(ExperimentStore, 'getUserExperimentDescriptor', (_ctx, [id], res) => {
         if (id !== '2022-10_context_menu_and_new_media_picker' || res?.bucket) return;

         return {
            type: 'user',
            revision: 1,
            population: 0,
            bucket: 1,
            override: true
         };
      });
   },

   onStop() {
      Patcher.unpatchAll();
   }
};

registerPlugin(FilePicker);
