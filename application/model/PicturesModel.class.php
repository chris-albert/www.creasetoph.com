<?php

class PicturesModel extends BaseModel{

    public function __construct(&$registry) {
        parent::__construct($registry);
    }

    /**
     * Gets all the users images for the first page in pictures
     */
    public function getUsersImages() {
        $return = $this->executeSQL('
            SELECT u.id, u.username AS link_name, u.image_id, i.tag, i.small_path
            from user_info u join images i
            on i.id = u.image_id
            order by u.id
            ');
        return $return;
    }

    public function getUserImageCategories($id) {
        $return = $this->executeSQL(
            array(
              'SELECT id as user_id, username
                FROM user_info
                WHERE id = ' .$id,
              'SELECT c.id, c.user_id , c.category_name as link_name, i.small_path, i.tag
                FROM image_categories c
                JOIN images i
                ON c.id = i.category_id
                WHERE c.user_id = '.$id .'
                GROUP BY i.category_id
                ORDER BY c.category_name',
              'SELECT i.id, i.small_path, i.large_path ,i.tag
                FROM images i
                WHERE user_id = '.$id.' AND category_id = 0 AND small_path != \'\''
            )
        );
        return $return;
    }

    public function getUserImageSubCategories($user_id,$category_id) {
        $return = $this->executeSQL(
            array(
                'SELECT u.id as user_id, c.id as category_id, u.username, c.category_name
                    FROM user_info u
                    JOIN image_categories c
                    ON u.id = c.user_id
                    WHERE c.id = '.$category_id,
                'SELECT s.id, s.sub_category_name as link_name, i.small_path, i.tag
                    FROM image_sub_categories s
                    JOIN images i
                    ON s.id = i.sub_category_id
                    JOIN image_categories c
                    ON c.id = i.category_id
                    WHERE s.user_id = '.$user_id.' AND i.category_id = '.$category_id.'
                    GROUP BY i.sub_category_id
                    ORDER BY s.sub_category_name',
                'SELECT i.id, i.small_path, i.large_path ,i.tag
                    FROM images i
                    WHERE user_id = '.$user_id.' AND i.category_id = '.$category_id.' AND i.sub_category_id = 0 AND i.small_path != \'\''
            )
        );
        return $return;
    }

    public function getUserSubCategoryImages($user_id,$category_id,$sub_category_id) {
        $return = $this->executeSQL(array(
          'SELECT u.id as user_id, c.id as category_id,s.id as sub_category_id, u.username, c.category_name, s.sub_category_name
            FROM user_info u
            JOIN image_categories c
            ON u.id = c.user_id
            JOIN image_sub_categories s
            ON u.id = s.user_id
            WHERE u.id = '.$user_id.' AND c.id = '.$category_id.' AND s.id = '.$sub_category_id,
          'SELECT i.id, i.small_path, i.large_path ,i.tag
            FROM images i
            JOIN image_categories c
            ON i.category_id = c.id
            JOIN image_sub_categories s
            ON i.sub_category_id = s.id
            WHERE i.user_id = '.$user_id.' AND i.category_id = '.$category_id.' AND i.sub_category_id = '.$sub_category_id.' AND i.small_path != \'\'
            '));
        return $return;
    }


}

?>
