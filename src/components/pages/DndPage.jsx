import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom'; // Импортируем Link для навигации

function DndPage() {
    const [columns, setColumns] = useState({
        todo: {
            name: 'To Do',
            items: [
                { id: '1', content: 'Покормить кота' },
                { id: '2', content: 'Сходить за кофе' },
                { id: '3', content: 'Сходить в художку' },
                { id: '4', content: 'Кофе и спать' },
                { id: '5', content: 'Ещё немного кофе' },
            ],
        },
        inProgress: {
            name: 'In Progress',
            items: [],
        },
        done: {
            name: 'Done',
            items: [],
        },
        blocked: {
            name: 'Blocked',
            items: [],
        },
    });

    const onDragEnd = (result) => {
      const { source, destination } = result;
  
      if (!destination) return;
  
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
  
      const sourceItems = [...sourceColumn.items];
      const destItems = destination.droppableId === source.droppableId 
          ? sourceItems // при перемещении внутри 1-го столбца, используем sourceItems
          : [...destColumn.items]; // при перемещении в другой столбец, используем destColumn
  
      const [removed] = sourceItems.splice(source.index, 1);
  
      if (source.droppableId === destination.droppableId) {
          sourceItems.splice(destination.index, 0, removed);
          setColumns({
              ...columns,
              [source.droppableId]: {
                  ...sourceColumn,
                  items: sourceItems,
              },
          });
      } else {
          destItems.splice(destination.index, 0, removed);
          setColumns({
              ...columns,
              [source.droppableId]: {
                  ...sourceColumn,
                  items: sourceItems,
              },
              [destination.droppableId]: {
                  ...destColumn,
                  items: destItems,
              },
          });
      }
  };

    const deleteItem = (columnId, itemId) => {
        const column = columns[columnId];
        const filteredItems = column.items.filter(item => item.id !== itemId);

        setColumns({
            ...columns,
            [columnId]: {
                ...column,
                items: filteredItems,
            },
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%', flexDirection: 'row' }}>
            <Link to="/" style={{ margin: '15px', textDecoration: 'none' ,color: 'black', fontSize: '25px' }}>
                Перейти к To-Do листу
            </Link>
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.entries(columns).map(([columnId, column]) => (
                    <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      margin: '0 20px',
                    }}
                        key={columnId}
                    >
                        <h2>{column.name}</h2>
                        <Droppable droppableId={columnId}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                        padding: 4,
                                        width: 250,
                                        minHeight: 500,
                                    }}
                                >
                                    {column.items.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        userSelect: 'none',
                                                        padding: 16,
                                                        margin: '0 0 8px 0',
                                                        minHeight: '50px',
                                                        backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                                        color: 'white',
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    {item.content}
                                                    <button
                                                        onClick={() => deleteItem(columnId, item.id)}
                                                        style={{
                                                            marginLeft: '10px',
                                                            backgroundColor: '	dodgerblue',
                                                            color: 'lightcyan',
                                                            border: 'none',
                                                            borderRadius: '3px',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        Удалить
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable> 
                    </div>
                ))}
            </DragDropContext>
        </div>
    );
}

export default DndPage;