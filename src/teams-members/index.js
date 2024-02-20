import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

registerBlockType( 'create-block/techearty-team', {
	title: __( 'Team Member', 'team-members' ),
	description: __( 'A team member item', 'team-members' ),
	icon: 'admin-users',
	parent: [ 'create-block/techearty-teams' ],
	supports: {
		reusable: false,
		html: false,
	},
	attributes: {
		name: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
		bio: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		id: {
			type: "number"
		},
		alt:{
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "alt",
			default: ''
		},
		url:{
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "src"
		}
	},
	edit: Edit,
	save: Save,
} );