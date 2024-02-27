import {
    useBlockProps,
    RichText,
    MediaPlaceholder,
    MediaReplaceFlow,
    BlockControls,
    InspectorControls,
    SelectControl,
    store as blockEditorStore
} from "@wordpress/block-editor";
import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { isBlobURL, revokeBlobURL } from "@wordpress/blob";
import { Spinner, withNotices, ToolbarButton, PanelBody, TextareaControl } from "@wordpress/components";
import '../editor.scss';
import {useSelect} from "@wordpress/data";

function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
    const { name, bio, url, alt, id } = attributes;
    const onUploadError = (message) => {
        noticeOperations.removeAllNotices();
        noticeOperations.createErrorNotice(message);
    };

    const [blobURL, setBlobURL] = useState();

    const onChangeName = (newName) => {
        setAttributes({ name: newName });
    };

    const onChangeBio = (newBio) => {
        setAttributes({ bio: newBio });
    };

    const onChangeAlt = (newAlt) => {
        setAttributes({ alt: newAlt });
    };

    const imageObject = useSelect((select)=>{
        const {getMedia} = select("core");
        return id ? getMedia(id) : "";
    }, [id]);

    const imageSizes = useSelect((select)=>{
        return select(blockEditorStore).getSettings().imageSizes;
    }, []);

    const onSelecImage = (image) => {
        if (!image || !image.url) {
            setAttributes({ url: undefined, id: undefined, alt: "" });
            return;
        }
        setAttributes({ url: image.url, id: image.id, alt: image.alt });
    };

    const onSelectURL = (newURL) => {
        setAttributes({
            url: newURL,
            id: undefined,
            alt: '',
        });
    };

    const removeImage = () => {
        setAttributes({
            url: undefined,
            alt: '',
            id: undefined,
        });
    };

    useEffect(() => {
        if (!id && isBlobURL(url)) {
            setAttributes({
                url: undefined,
                alt: '',
            });
        }
    }, [id, url, setAttributes]);

    useEffect(() => {
        if (isBlobURL(url)) {
            setBlobURL(url);
        } else {
            revokeBlobURL(blobURL);
            setBlobURL();
        }
    }, [url, blobURL]);

    const onChangeImageSize = (newURL) => {
        setAttributes({ url: newURL, id: imageObject.id });
    };

    const getImageSizeOptions = () => {
        if (!imageObject) return [];
        const options = [];
        const sizes = imageObject.media_details.sizes;
        for (const key in sizes) {
            const size = sizes[key];
            const imageSize = imageSizes.find((s) => s.slug === key);
            if (imageSize) {
                options.push({
                    label: imageSize.name,
                    value: size.source_url,
                });
            }
        }
        return options;
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Image Settings", 'team-members')}>
                
                    {url && !isBlobURL(url) &&   <TextareaControl
                        label={__("Alt Text", 'team-members')}
                        value={alt}
                        onChange={onChangeAlt}
                        help={__("the quick brown fox jumps over the lazy dog", "team-members")}
                    />}
                </PanelBody>
            </InspectorControls>

            {url && (
                <BlockControls>
                    <MediaReplaceFlow
                        name={__("Replace Image", 'team-members')}
                        onSelect={onSelecImage}
                        onSelectURL={onSelectURL}
                        onError={onUploadError}
                        allowedTypes={["image"]}
                        disableMediaButtons={url}
                        notices={noticeUI}
                        mediaId={id}
                        mediaURL={url}
                    />
                    <ToolbarButton onClick={removeImage}>{__('Remove Image', 'team-member')}</ToolbarButton>
                </BlockControls>
            )}

            <div {...useBlockProps()}>
                {url && (
                    <div className={`wp-block-blocks-course-team-member-img${isBlobURL(url) ? ' is-loading' : ''}`}>
                        <img src={url} alt={alt} />
                        {isBlobURL(url) && <Spinner />}
                    </div>
                )}

                <MediaPlaceholder
                    icon="admin-users"
                    onSelect={onSelecImage}
                    onSelectURL={onSelectURL}
                    onError={onUploadError}
                    allowedTypes={["image"]}
                    disableMediaButtons={url}
                    notices={noticeUI}
                />

                <RichText
                    placeholder={__("Member Name", "team-member")}
                    tagName="h4"
                    onChange={onChangeName}
                    value={name}
                    allowedFormats={[]}
                />
                <RichText
                    placeholder={__("Member Bio", "team-member")}
                    tagName="p"
                    onChange={onChangeBio}
                    value={bio}
                    allowedFormats={[]}
                />
            </div>
        </>
    );
}

export default withNotices(Edit);
