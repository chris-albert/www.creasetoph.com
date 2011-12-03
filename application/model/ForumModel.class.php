<?php


class ForumModel extends BaseModel{

    public function __construct(&$registry) {
        parent::__construct($registry);
    }

    public function getForums() {
        return $this->executeSQL(
             'SELECT s.id, s.user_id, u.username, s.forum_id, f.title as forum,f.description, s.title, s.content,s.date, z.threads,x.posts
                FROM (SELECT a.* FROM forum_posts a WHERE a.id IN (
                SELECT id FROM (SELECT id, forum_id FROM forum_posts ORDER BY date desc) d GROUP BY forum_id)
                AND a.parent_post_id = 0 GROUP BY forum_id
                UNION
                SELECT a.* FROM forum_posts a JOIN forum_posts m ON a.id = m.parent_post_id AND m.parent_post_id <> 0
                WHERE m.id IN (SELECT id FROM (SELECT id, forum_id FROM forum_posts ORDER BY date desc) d GROUP BY forum_id)) s
                JOIN user_info u ON s.user_id = u.id JOIN forums f ON s.forum_id = f.id
                JOIN (SELECT forum_id, COUNT(id) as threads FROM forum_posts WHERE parent_post_id = 0 GROUP BY forum_id) z
                ON s.forum_id = z.forum_id JOIN(SELECT forum_id, COUNT(id) as posts FROM forum_posts GROUP BY forum_id) x
                ON s.forum_id = x.forum_id ORDER BY s.forum_id'
            );
    }

    public function getThreads($id) {
        return $this->executeSQL(array(
             'SELECT title FROM forums where id = \''.$id.'\' LIMIT 1',
             'SELECT i.*, f.username as thread_username FROM(SELECT t.*,u.username FROM(SELECT s.*, m.* FROM (
                SELECT c.*, IFNULL(d.replies,0) as replies FROM (SELECT * FROM(SELECT * FROM(
                SELECT p.id, p.user_id,p.forum_id,p.id as parent_post_id,p.title,p.content,p.date,p.ip
                FROM forum_posts p WHERE p.parent_post_id = 0 AND p.forum_id = ' . $id . ' UNION
                SELECT p.id, p.user_id,p.forum_id,p.parent_post_id,p.title,p.content,p.date,p.ip
                FROM forum_posts p WHERE p.parent_post_id <> 0 AND p.forum_id = ' . $id . ' ) a ORDER BY date desc)b
                GROUP BY parent_post_id) c LEFT JOIN (SELECT parent_post_id as id, count(parent_post_id) as replies
                FROM forum_posts WHERE parent_post_id IN(SELECT p.id FROM forum_posts p WHERE p.parent_post_id = 0 AND p.forum_id = ' . $id . '
                ORDER BY date desc) GROUP BY parent_post_id) d ON c.parent_post_id = d.id) s JOIN(
                SELECT p.id as thread_id, p.title as thread_title,p.user_id as thread_creator FROM forum_posts p
                WHERE p.parent_post_id = 0 AND p.forum_id = ' . $id . ') m ON s.parent_post_id = m.thread_id) t JOIN user_info u
                ON t.user_id = u.id) i JOIN user_info f ON i.thread_creator = f.id'
            ));
    }

    public function getPosts($id,$first,$elements) {
        $sql = 'SELECT p.id,p.user_id,u.username,p.title,p.content,p.date,u.signature,i.small_path,u.rank
                  FROM forum_posts p JOIN user_info u ON p.user_id = u.id JOIN images i
                  ON i.id = u.image_id WHERE p.parent_post_id = '.$id.' OR p.id = '.$id.' ORDER BY date';
        $page_sql = $this->buildPaginationSQL($sql, $first, $elements);
        $sql =  array('SELECT p.title as thread_name, f.title as forum_name,f.id as forum_id
                  FROM forum_posts p JOIN forums f ON p.forum_id = f.id WHERE p.id = '.$id);
        return $this->executeSQL(array_merge($sql,$page_sql));
    }

    public function getPost($id) {
        return $this->executeSQL(array(
             'SELECT p2.id AS thread_id, p2.title AS thread_name, f.id as forum_id, f.title AS forum_name
                FROM forum_posts p1 JOIN forum_posts p2 ON p1.parent_post_id = p2.id OR p1.id = p2.id
                JOIN forums f ON p1.forum_id = f.id WHERE p1.id = '.$id.' LIMIT 1',
             'SELECT p.id, p.user_id,u.username,p.title,p.content,p.date,u.rank,u.signature,i.small_path
                FROM forum_posts p JOIN user_info u ON p.user_id = u.id JOIN images i
                ON u.image_id = i.id WHERE p.id = '.$id.' LIMIT 1'
            ));
    }
}

?>
