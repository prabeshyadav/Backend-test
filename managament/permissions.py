def is_content_owner(user, content):
    """
    Check if the logged-in user owns this content.
    """
    return content.owner_id == user.id


def can_update_content(user, content):
    """
    Only content owner can update.
    """
    return is_content_owner(user, content)


def can_delete_content(user, content):
    """
    Only content owner can delete.
    """
    return is_content_owner(user, content)