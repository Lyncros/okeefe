<?php echo $__env->make("inc.header", array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
<?php require app_path().'/../public/templates/base/index.html';?>
<?php echo $__env->make("inc.footer", array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>