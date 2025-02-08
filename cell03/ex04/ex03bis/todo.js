$(document).ready(function () {
    function escapeHTML(str) { 
        return $("<div>").text(str).html(); // ป้องกัน XSS
    }

    function encodeBase64(str) {
        return btoa(unescape(encodeURIComponent(str))); // Encode เป็น Base64
    }

    function decodeBase64(str) {
        return decodeURIComponent(escape(atob(str))); // Decode กลับ
    }

    function loadTasks() {
        let tasks = getCookies("tasks");
        console.log("Loaded Cookie (Raw):", document.cookie); // Debug

        if (tasks) {
            tasks.split("|~|").reverse().forEach(task => { 
                if (task) {
                    let decodedTask = decodeBase64(task);
                    console.log("Decoded Task:", decodedTask); // Debug
                    $("#ft_list").prepend(
                        $("<div>").addClass("task").text(decodedTask) 
                    );
                }
            });
        }
    }

    function saveTasks() {
        let taskArray = [];
        $(".task").each(function () {
            let encodedTask = encodeBase64($(this).text());
            console.log("Encoded Task:", encodedTask); // Debug
            taskArray.push(encodedTask);
        });

        let finalCookie = "tasks=" + taskArray.join("|~|") + "; path=/";
        document.cookie = finalCookie;
        console.log("Saved Cookie:", finalCookie); // Debug
    }

    function getCookies(name) {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : "";
    }

    $("#newTask").on("click", function () {
        let task = prompt("Enter a new task:");
        if (task) {
            let escapedTask = escapeHTML(task);
            $("#ft_list").prepend(
                $("<div>").addClass("task").text(escapedTask)
            );
            saveTasks();
        }
    });

    $("#ft_list").on("click", ".task", function () {
        if (confirm("Do you want to delete this task?")) {
            $(this).remove();
            saveTasks();
        }
    });

    loadTasks();
});
