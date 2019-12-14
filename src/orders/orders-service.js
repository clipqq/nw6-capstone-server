const xss = require('xss')

const OrdersService = {
  getOrdersByUserId(db, userId) {
    return db
      .from('fuudi_orders AS orders')
      .select(
        'orders.id',
        'orders.menu_item_id',
        'orders.added_date',
        db.raw(
          `row_to_json(
            (SELECT tmp FROM (
              SELECT
                usr.id,
                usr.user_name,
                usr.full_name,
                usr.nickname,
                usr.date_created,
                usr.date_modified
            ) tmp)
          ) AS "user"`
        )
      )
      .leftJoin(
        'fuudi_menu AS menu',
        'orders.menu_item_id',
        'menu.id',
      )
      .where('orders.user_id', userId)
      .first()
  },

  insertOrderByUserId(db, userId, menuItemId) {
    return db
      .insert(menuItemId)
      .into('fuudi_orders')
      .where('user_id', userId)
      .returning('*')
      .then(([order]) => order)
      .then(order =>
        OrdersService.getOrdersByUserId(db, order.user_id)
      )
  },

}

module.exports = OrdersService