import * as React from "react";
import { Tree } from "antd";
import TreeItem from "./TreeItem";
import { ITreeData } from "../types/project";

const treeData = [
  {
    key: "1",
    label: "111",
    id: 1,
    children: [
      {
        key: "2",
        label: "2",
        id: 2,
        children: [
          {
            id: 21,
            label: "21",
            key: "2-1"
          },
          {
            id: 22,
            label: "22",
            key: "2-2"
          }
        ]
      },
      {
        id: 3,
        label: "3",
        key: "3"
      }
    ]
  }
];

// function findTarget(arr: ITreeData[], id: number) {
//   return arr.find(item => {
//     item._father = arr;
//     if (item.children && item.children.length > 0) {
//       findTarget(item.children, id);
//     }
//     return item.id === id;
//   });
// }
// function findFather(arr: ITreeData[], id: number) {
//   const copyArr: ITreeData[] = [];
//   function next(newArr: ITreeData[]) {
//     newArr.forEach((item: ITreeData) => {
//       copyArr.push(item);
//       if (item.children && item.children.length > 0) {
//         next(item.children);
//       }
//     });
//   }
//   next(arr);
//   return copyArr.find(item => {
//     return item.id === id;
//   });
// }
const TreeView = () => {
  // const handleAdd = (id: number) => {
  //   console.log(id);
  // };
  // const handleDelete = (id: number) => {
  //   const tag = findFather(list, id);
  //   let father = (tag as ITreeData)._father;
  //   father = (father as ITreeData[]).filter(item => item.id !== id);
  //   console.log(father);
  // let father = findTarget(list, id)._father;
  // father = father.filter((item: { id: number }) => item.id !== id);
  // };
  const freshData = (data: ITreeData[]) => {
    const listData = mergeTree<ITreeData>(data);
    console.log(listData);
    setTree(listData);
  };
  function mergeTree<T extends ITreeData>(arr: T[]): T[] {
    arr.forEach(item => {
      item.title = (
        <TreeItem
          key={item.key}
          title={item.label}
          id={item.id}
          show={item.show || false}
          treeData={treeData}
          freshData={freshData}
        />
      );
      if (item.children && item.children.length > 0) {
        mergeTree<ITreeData>(item.children);
      }
    });
    return arr;
  }
  const list = mergeTree<ITreeData>(treeData);
  const [treeList, setTree] = React.useState(list);
  return (
    <div>
      <Tree blockNode={true} defaultExpandAll={true} treeData={treeList} />
    </div>
  );
};
export default TreeView;
