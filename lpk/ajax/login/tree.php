<?php
/*
**********************************************
	Author:	blue@zhinengshe.com
	Date:	2012-4-5

	usage:	tree.php?act=get_tree&id=节点ID
	
	
	
**********************************************
*/

//创建数据库之类的
$db=@mysql_connect('localhost', 'root', '') or @mysql_connect('localhost', 'root', 'admin');

mysql_query("set names 'utf8'");
mysql_query('CREATE DATABASE zns_ajax');

mysql_select_db('zns_ajax');

$sql= <<< END
CREATE TABLE  `zns_ajax`.`tree` (
`ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`name` VARCHAR( 255 ) NOT NULL ,
`href` VARCHAR( 255 ) NOT NULL ,
`parent_id` INT NOT NULL
) CHARACTER SET utf8 COLLATE utf8_general_ci
END;

mysql_query($sql);

$sql= <<< END
TRUNCATE TABLE  `tree`
END;

mysql_query($sql);

$sql= <<< END
INSERT INTO `tree` (`ID`, `name`, `href`, `parent_id`) VALUES
(1, 'tree1', '', 0),
(2, '相机', '', 1),
(3, '手机', '', 1),
(4, 'sony', '', 2),
(5, '康佳', '', 2),
(6, '佳能', '', 2),
(7, '苹果', '', 2),
(8, 'xb-750', '', 6),
(9, 'mac2', '', 6);
END;

mysql_query($sql);

$sql= <<< END
CREATE TABLE  `zns_ajax`.`tree` (
`ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`name` VARCHAR( 255 ) NOT NULL ,
`href` VARCHAR( 255 ) NOT NULL ,
`parent_id` INT NOT NULL
) CHARACTER SET utf8 COLLATE utf8_general_ci
END;

mysql_query($sql);

//正式开始

//header('Content-type:zns/json');

$act=$_GET['act'];

function arr2str($res)
{
	$aResult=array();
	while($row=mysql_fetch_array($res))
	{
		$arr=array();
		array_push($arr, 'id:'.$row[0]);
		array_push($arr, 'name:"'.$row[1].'"');
		array_push($arr, 'href:"'.$row[2].'"');
		array_push($arr, 'parent_id:'.$row[3]);
		
		array_push($aResult, implode(',', $arr));
	}
	if(count($aResult)>0)
	{
		return '[{'.implode('},{', $aResult).'}]';
	}
	else
	{
		return '[]';
	}
}

switch($act)
{
	case 'add':
		$name=$_GET['name'];
		$href=$_GET['href'];
		$parent_id=$_GET['parent_id'];
		
		$sql="INSERT INTO tree (name,href,parent_id) VALUES('{$name}','{$href}','{$parent_id}')";
		mysql_query($sql);
		
		echo '{error: 0}';
		break;
	case 'get_tree':
		$id=(int)$_GET['id'];
		
		$sql="SELECT * FROM tree WHERE parent_id={$id}";
		
		echo '{error: 0, child: '.arr2str(mysql_query($sql)).'}';
		break;
	case 'get_trees':
		$sql="SELECT * FROM tree WHERE parent_id=0";
		
		echo '{error: 0, child: '.arr2str(mysql_query($sql)).'}';
		break;
}












?>