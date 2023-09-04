<script>
  import { page } from '$app/stores';
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
  const day = currentDate.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
</script>

<h1>Create Page</h1>
<form method="POST">
  <label for="title">Title:
    <input type="text" name="title" id="title" maxlength="50" required>
  </label>
  <label for="content">Content:
    <textarea name="content" id="content" cols="30" rows="10" required></textarea>
  </label>

  <!-- Include session data as a hidden input field -->
  <input type="hidden" name="session" value="{JSON.stringify($page.data.session?.user?.name)}">

  <button>Submit</button>
</form>



