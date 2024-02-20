
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import './editor.scss';
export default function Edit({attributes,setAttributes}) {
	const{columns}= attributes;
	const onChangeColums = (newColumns)=>{
		setAttributes({columns: newColumns})
	}
	return (
		<div { ...useBlockProps({
			className: `has-${columns}-columns`
		}) }>
			<InspectorControls>
				<PanelBody>
					<RangeControl label={__("Columns","team-members")} min={1} max={6}
					onChange={onChangeColums}
					value={columns}
					/>

					
				</PanelBody>
			</InspectorControls>
			<InnerBlocks allowedBlocks={["create-block/techearty-team"]}
			template={
				[
					['create-block/techearty-team'],
					['create-block/techearty-team'],
					['create-block/techearty-team']
				]
			}
			/>
		</div>
	);
}
