import FolderTree, {initializedTestData, testData} from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';

const BasicTree = ({directoryTree}) => {
    const onTreeStateChange = (state, event) => console.log(state, event);
    // console.log(initializedTestData)
    // console.log(directoryTree)

    // console.log("_-------_")
    console.log(testData)

    return (
        <FolderTree
            data={directoryTree}
            onChange={ onTreeStateChange }
            showCheckbox={ false }
        />
    );
};

export default BasicTree;