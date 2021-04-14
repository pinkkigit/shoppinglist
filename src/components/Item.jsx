import React, { useState } from "react";
import {
  Checkbox,
  Form,
  Grid,
  Icon,
  Input,
  List,
  Segment,
} from "semantic-ui-react";
import "../index.css";
import EditNameForm from "./EditNameForm";
import Quantity from "./Quantity";

const Item = ({
  item,
  handleRemove,
  handleCheckChange,
  handleEdit,
  handleQuantityChange,
}) => {
  const [editItem, setEditItem] = useState(false);
  const [value, setValue] = useState(item.name);

  const handleEditClick = (item) => {
    setEditItem(!editItem);
    setValue(value);
    handleEdit(item, value);
  };

  return (
    <List.Item>
      <List.Content className="item-list">
        <Quantity item={item} handleQuantityChange={handleQuantityChange} />
        {editItem ? (
          <EditNameForm
            item={item}
            handleEditClick={handleEditClick}
            value={value}
            setValue={setValue}
          />
        ) : (
          <span className="item-name" onClick={() => handleCheckChange(item)}>
            <p className={item.checked ? "strikethrough" : null}>{item.name}</p>
          </span>
        )}

        <List.Content className="edit-and-remove-buttons">
          <span className="cursorPointer" onClick={() => handleEditClick(item)}>
            <Icon size="large" name="edit outline" />
          </span>
          <span className="cursorPointer" onClick={() => handleRemove(item)}>
            <Icon size="large" name="trash alternate outline" />
          </span>
        </List.Content>
      </List.Content>
    </List.Item>
  );
};

export default Item;

{
  /* <Grid
      divided
      columns="equal"
      container
      padded="horizontally"
      verticalAlign="middle"
    >
      <Grid.Column textAlign="left">
        <span className="quantity-and-name">
          <span className="quantity">
            <span className="button-minus">
              <Icon
                size="large"
                name="angle left"
                onClick={() =>
                  handleQuantityChange(item, Number(item.quantity) - 1)
                }
              />
            </span>
            {item.quantity}
            <span className="button-plus">
              <Icon
                size="large"
                name="angle right"
                onClick={() =>
                  handleQuantityChange(item, Number(item.quantity) + 1)
                }
              />
            </span>
          </span>
          {editItem ? (
            <Form>
              <Form.Group inline>
                <Input
                  autoFocus
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={() => handleEditClick(item)}
                />
              </Form.Group>
            </Form>
          ) : (
            <span className="item-name" onClick={() => handleCheckChange(item)}>
              <p className={item.checked ? "strikethrough" : null}>
                {item.name}
              </p>
            </span>
          )}
        </span>
      </Grid.Column>
      <Grid.Column textAlign="right">
        <span className="cursorPointer" onClick={() => handleEditClick(item)}>
          <Icon name="edit outline" />
        </span>
        <span className="cursorPointer" onClick={() => handleRemove(item)}>
          <Icon name="trash alternate outline" />
        </span>
      </Grid.Column>
    </Grid> */
}

// return (
//   <Segment>
//     <Grid
//       doubling
//       divided
//       columns="equal"
//       container
//       padded="horizontally"
//       verticalAlign="middle"
//     >
//       <Grid.Column>
//         <div className="quantity">
//           <div className="button-minus">
//             <Icon
//               size="large"
//               name="angle left"
//               onClick={() =>
//                 handleQuantityChange(item, Number(item.quantity) - 1)
//               }
//             />
//           </div>
//           {item.quantity}
//           <div className="button-plus">
//             <Icon
//               size="large"
//               name="angle right"
//               onClick={() =>
//                 handleQuantityChange(item, Number(item.quantity) + 1)
//               }
//             />
//           </div>
//         </div>
//       </Grid.Column>
//       <Grid.Column textAlign="left">
//         {editItem ? (
//           <Form>
//             <Form.Group inline>
//               <Input
//                 autoFocus
//                 value={value}
//                 onChange={(e) => setValue(e.target.value)}
//                 onBlur={() => handleEditClick(item)}
//               />
//             </Form.Group>
//           </Form>
//         ) : (
//           <span
//             className="cursorPointer"
//             onClick={() => handleCheckChange(item)}
//           >
//             <p className={item.checked ? "strikethrough" : null}>
//               {item.name}
//             </p>
//           </span>
//         )}
//       </Grid.Column>
//       <Grid.Column textAlign="right">
//         <span className="cursorPointer" onClick={() => handleEditClick(item)}>
//           <Icon name="edit outline" />
//         </span>
//         <span className="cursorPointer" onClick={() => handleRemove(item)}>
//           <Icon name="trash alternate outline" />
//         </span>
//       </Grid.Column>
//     </Grid>
//   </Segment>
// );
