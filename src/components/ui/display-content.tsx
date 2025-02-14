interface Props {
    content: string;
}

const DisplayContent = ({content}: Props) => {
    return (
        <div className='displayContent prose lg:prose-xl'>
            <div dangerouslySetInnerHTML={{__html: content}} />
        </div>
    )
}

export default DisplayContent