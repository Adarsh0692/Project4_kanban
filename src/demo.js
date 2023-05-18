<div className={style.dash_div}>
<Navbar />
<h1> New DashBoard</h1>
<div className={style.dash_containor}>
  <div className={style.list_container}>
    {list.map((item) => (
      <div key={item.id} className={style.cardBox}>
        <div className={style.list_card}>
          <div className={style.listName}>
            <span>{item.title}</span>
            <span onClick={() => handleListDelete(item.id)}>
              <DeleteIcon />
            </span>
          </div>
          <div>
            {item.task &&
              item.task.map((task) => (
                <div key={task.id} className={style.card}>
                  <Card cardData={task} />
                  <span> <EditIcon sx={{ fontSize: '20px' }} /></span>
                </div>
              ))}
          </div>
          <div className={style.cardBtn}>
            <AddNew type="card" listId={item.id} />
          </div>
        </div>
      </div>
    ))}
  </div>
  <AddNew />
</div>
</div>