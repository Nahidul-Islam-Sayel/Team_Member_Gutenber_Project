import { registerBlockType } from '@wordpress/blocks';
import './style.scss'; 
import Edit from './edit'; 
import save from './save'; 
import './teams-members';

registerBlockType('create-block/techearty-teams', {
    edit: Edit,
    save,
});
